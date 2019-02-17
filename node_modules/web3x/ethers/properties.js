'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors = tslib_1.__importStar(require("./errors"));
function defineReadOnly(object, name, value) {
    Object.defineProperty(object, name, {
        enumerable: true,
        value: value,
        writable: false,
    });
}
exports.defineReadOnly = defineReadOnly;
// There are some issues with instanceof with npm link, so we use this
// to ensure types are what we expect.
function setType(object, type) {
    Object.defineProperty(object, '_ethersType', { configurable: false, value: type, writable: false });
}
exports.setType = setType;
function isType(object, type) {
    return object && object._ethersType === type;
}
exports.isType = isType;
function resolveProperties(object) {
    let result = {};
    let promises = [];
    Object.keys(object).forEach(key => {
        let value = object[key];
        if (value instanceof Promise) {
            promises.push(value.then(value => {
                result[key] = value;
            }));
        }
        else {
            result[key] = value;
        }
    });
    return Promise.all(promises).then(() => {
        return result;
    });
}
exports.resolveProperties = resolveProperties;
function checkProperties(object, properties) {
    if (!object || typeof object !== 'object') {
        return errors.throwError('invalid object', errors.INVALID_ARGUMENT, {
            argument: 'object',
            value: object,
        });
    }
    Object.keys(object).forEach(key => {
        if (!properties[key]) {
            return errors.throwError('invalid object key - ' + key, errors.INVALID_ARGUMENT, {
                argument: 'transaction',
                value: object,
                key: key,
            });
        }
    });
}
exports.checkProperties = checkProperties;
function shallowCopy(object) {
    let result = {};
    for (var key in object) {
        result[key] = object[key];
    }
    return result;
}
exports.shallowCopy = shallowCopy;
let opaque = { boolean: true, number: true, string: true };
function deepCopy(object, frozen) {
    // Opaque objects are not mutable, so safe to copy by assignment
    if (object === undefined || object === null || opaque[typeof object]) {
        return object;
    }
    // Arrays are mutable, so we need to create a copy
    if (Array.isArray(object)) {
        let result = object.map(item => deepCopy(item, frozen));
        if (frozen) {
            Object.freeze(result);
        }
        return result;
    }
    if (typeof object === 'object') {
        // Some internal objects, which are already immutable
        if (isType(object, 'BigNumber')) {
            return object;
        }
        if (isType(object, 'Description')) {
            return object;
        }
        if (isType(object, 'Indexed')) {
            return object;
        }
        let result = {};
        for (let key in object) {
            let value = object[key];
            if (value === undefined) {
                continue;
            }
            defineReadOnly(result, key, deepCopy(value, frozen));
        }
        if (frozen) {
            Object.freeze(result);
        }
        return result;
    }
    // The function type is also immutable, so safe to copy by assignment
    if (typeof object === 'function') {
        return object;
    }
    throw new Error('Cannot deepCopy ' + typeof object);
}
exports.deepCopy = deepCopy;
// See: https://github.com/isaacs/inherits/blob/master/inherits_browser.js
function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true,
        },
    });
}
function inheritable(parent) {
    return function (child) {
        inherits(child, parent);
        defineReadOnly(child, 'inherits', inheritable(child));
    };
}
exports.inheritable = inheritable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldGhlcnMvcHJvcGVydGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7OztBQUViLHlEQUFtQztBQUVuQyxTQUFnQixjQUFjLENBQUMsTUFBVyxFQUFFLElBQVksRUFBRSxLQUFVO0lBQ2xFLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtRQUNsQyxVQUFVLEVBQUUsSUFBSTtRQUNoQixLQUFLLEVBQUUsS0FBSztRQUNaLFFBQVEsRUFBRSxLQUFLO0tBQ2hCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFORCx3Q0FNQztBQUVELHNFQUFzRTtBQUN0RSxzQ0FBc0M7QUFFdEMsU0FBZ0IsT0FBTyxDQUFDLE1BQVcsRUFBRSxJQUFZO0lBQy9DLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUN0RyxDQUFDO0FBRkQsMEJBRUM7QUFFRCxTQUFnQixNQUFNLENBQUMsTUFBVyxFQUFFLElBQVk7SUFDOUMsT0FBTyxNQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUM7QUFDL0MsQ0FBQztBQUZELHdCQUVDO0FBRUQsU0FBZ0IsaUJBQWlCLENBQUMsTUFBVztJQUMzQyxJQUFJLE1BQU0sR0FBUSxFQUFFLENBQUM7SUFFckIsSUFBSSxRQUFRLEdBQXlCLEVBQUUsQ0FBQztJQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNoQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBSSxLQUFLLFlBQVksT0FBTyxFQUFFO1lBQzVCLFFBQVEs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