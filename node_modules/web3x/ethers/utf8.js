'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const bytes_1 = require("./bytes");
///////////////////////////////
var UnicodeNormalizationForm;
(function (UnicodeNormalizationForm) {
    UnicodeNormalizationForm["current"] = "";
    UnicodeNormalizationForm["NFC"] = "NFC";
    UnicodeNormalizationForm["NFD"] = "NFD";
    UnicodeNormalizationForm["NFKC"] = "NFKC";
    UnicodeNormalizationForm["NFKD"] = "NFKD";
})(UnicodeNormalizationForm = exports.UnicodeNormalizationForm || (exports.UnicodeNormalizationForm = {}));
// http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
function toUtf8Bytes(str, form = UnicodeNormalizationForm.current) {
    if (form != UnicodeNormalizationForm.current) {
        str = str.normalize(form);
    }
    var result = [];
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c < 0x80) {
            result.push(c);
        }
        else if (c < 0x800) {
            result.push((c >> 6) | 0xc0);
            result.push((c & 0x3f) | 0x80);
        }
        else if ((c & 0xfc00) == 0xd800) {
            i++;
            let c2 = str.charCodeAt(i);
            if (i >= str.length || (c2 & 0xfc00) !== 0xdc00) {
                throw new Error('invalid utf-8 string');
            }
            // Surrogate Pair
            c = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);
            result.push((c >> 18) | 0xf0);
            result.push(((c >> 12) & 0x3f) | 0x80);
            result.push(((c >> 6) & 0x3f) | 0x80);
            result.push((c & 0x3f) | 0x80);
        }
        else {
            result.push((c >> 12) | 0xe0);
            result.push(((c >> 6) & 0x3f) | 0x80);
            result.push((c & 0x3f) | 0x80);
        }
    }
    return bytes_1.arrayify(result);
}
exports.toUtf8Bytes = toUtf8Bytes;
// http://stackoverflow.com/questions/13356493/decode-utf-8-with-javascript#13691499
function toUtf8String(bytes, ignoreErrors) {
    bytes = bytes_1.arrayify(bytes);
    let result = '';
    let i = 0;
    // Invalid bytes are ignored
    while (i < bytes.length) {
        var c = bytes[i++];
        // 0xxx xxxx
        if (c >> 7 === 0) {
            result += String.fromCharCode(c);
            continue;
        }
        // Multibyte; how many bytes left for this character?
        let extraLength;
        let overlongMask;
        // 110x xxxx 10xx xxxx
        if ((c & 0xe0) === 0xc0) {
            extraLength = 1;
            overlongMask = 0x7f;
            // 1110 xxxx 10xx xxxx 10xx xxxx
        }
        else if ((c & 0xf0) === 0xe0) {
            extraLength = 2;
            overlongMask = 0x7ff;
            // 1111 0xxx 10xx xxxx 10xx xxxx 10xx xxxx
        }
        else if ((c & 0xf8) === 0xf0) {
            extraLength = 3;
            overlongMask = 0xffff;
        }
        else {
            if (!ignoreErrors) {
                if ((c & 0xc0) === 0x80) {
                    throw new Error('invalid utf8 byte sequence; unexpected continuation byte');
                }
                throw new Error('invalid utf8 byte sequence; invalid prefix');
            }
            continue;
        }
        // Do we have enough bytes in our data?
        if (i + extraLength > bytes.length) {
            if (!ignoreErrors) {
                throw new Error('invalid utf8 byte sequence; too short');
            }
            // If there is an invalid unprocessed byte, skip continuation bytes
            for (; i < bytes.length; i++) {
                if (bytes[i] >> 6 !== 0x02) {
                    break;
                }
            }
            continue;
        }
        // Remove the length prefix from the char
        let res = c & ((1 << (8 - extraLength - 1)) - 1);
        for (let j = 0; j < extraLength; j++) {
            var nextChar = bytes[i];
            // Invalid continuation byte
            if ((nextChar & 0xc0) != 0x80) {
                res = null;
                break;
            }
            res = (res << 6) | (nextChar & 0x3f);
            i++;
        }
        if (res === null) {
            if (!ignoreErrors) {
                throw new Error('invalid utf8 byte sequence; invalid continuation byte');
            }
            continue;
        }
        // Check for overlong seuences (more bytes than needed)
        if (res <= overlongMask) {
            if (!ignoreErrors) {
                throw new Error('invalid utf8 byte sequence; overlong');
            }
            continue;
        }
        // Maximum code point
        if (res > 0x10ffff) {
            if (!ignoreErrors) {
                throw new Error('invalid utf8 byte sequence; out-of-range');
            }
            continue;
        }
        // Reserved for UTF-16 surrogate halves
        if (res >= 0xd800 && res <= 0xdfff) {
            if (!ignoreErrors) {
                throw new Error('invalid utf8 byte sequence; utf-16 surrogate');
            }
            continue;
        }
        if (res <= 0xffff) {
            result += String.fromCharCode(res);
            continue;
        }
        res -= 0x10000;
        result += String.fromCharCode(((res >> 10) & 0x3ff) + 0xd800, (res & 0x3ff) + 0xdc00);
    }
    return result;
}
exports.toUtf8String = toUtf8String;
function formatBytes32String(text) {
    // Get the bytes
    let bytes = toUtf8Bytes(text);
    // Check we have room for null-termination
    if (bytes.length > 31) {
        throw new Error('bytes32 string must be less than 32 bytes');
    }
    // Zero-pad (implicitly null-terminates)
    return bytes_1.hexlify(bytes_1.concat([bytes, constants_1.HashZero]).slice(0, 32));
}
exports.formatBytes32String = formatBytes32String;
function parseBytes32String(bytes) {
    let data = bytes_1.arrayify(bytes);
    // Must be 32 bytes with a null-termination
    if (data.length !== 32) {
        throw new Error('invalid bytes32 - not 32 bytes long');
    }
    if (data[31] !== 0) {
        throw new Error('invalid bytes32 sdtring - no null terminator');
    }
    // Find the null termination
    let length = 31;
    while (data[length - 1] === 0) {
        length--;
    }
    // Determine the string value
    return toUtf8String(data.slice(0, length));
}
exports.parseBytes32String = parseBytes32String;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRmOC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldGhlcnMvdXRmOC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7O0FBRWIsMkNBQXVDO0FBRXZDLG1DQUFvRDtBQU9wRCwrQkFBK0I7QUFFL0IsSUFBWSx3QkFNWDtBQU5ELFdBQVksd0JBQXdCO0lBQ2xDLHdDQUFZLENBQUE7SUFDWix1Q0FBVyxDQUFBO0lBQ1gsdUNBQVcsQ0FBQTtJQUNYLHlDQUFhLENBQUE7SUFDYix5Q0FBYSxDQUFBO0FBQ2YsQ0FBQyxFQU5XLHdCQUF3QixHQUF4QixnQ0FBd0IsS0FBeEIsZ0NBQXdCLFFBTW5DO0FBRUQsdUZBQXVGO0FBQ3ZGLFNBQWdCLFdBQVcsQ0FDekIsR0FBVyxFQUNYLE9BQWlDLHdCQUF3QixDQUFDLE9BQU87SUFFakUsSUFBSSxJQUFJLElBQUksd0JBQXdCLENBQUMsT0FBTyxFQUFFO1FBQzVDLEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCO0lBRUQsSUFBSSxNQUFNLEdBQVUsRUFBRSxDQUFDO0lBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFO1lBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoQjthQUFNLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRTtZQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcs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