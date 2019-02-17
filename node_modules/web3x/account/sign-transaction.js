"use strict";
/*
  This file is part of web3x.

  web3x is free software: you can redistribute it and/or modify
  it under the terms of the GNU Lesser General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  web3x is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public License
  along with web3x.  If not, see <http://www.gnu.org/licenses/>.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const rlp_1 = require("rlp");
const address_1 = require("../address");
const account_1 = tslib_1.__importDefault(require("../eth-lib/account"));
const bytes_1 = tslib_1.__importDefault(require("../eth-lib/bytes"));
const nat_1 = tslib_1.__importDefault(require("../eth-lib/nat"));
const rlp_2 = tslib_1.__importDefault(require("../eth-lib/rlp"));
const formatters_1 = require("../formatters");
const utils_1 = require("../utils");
async function signTransaction(tx, privateKey, eth) {
    if (!tx.gas) {
        throw new Error('gas is missing or 0');
    }
    // Resolve immediately if nonce, chainId and price are provided
    if (tx.nonce !== undefined && tx.chainId !== undefined && tx.gasPrice !== undefined) {
        return sign(tx, privateKey);
    }
    // Otherwise, get the missing info from the Ethereum Node
    const promises = [
        isNot(tx.chainId) ? eth.getId() : Promise.resolve(tx.chainId),
        isNot(tx.gasPrice) ? eth.getGasPrice() : Promise.resolve(tx.gasPrice),
        isNot(tx.nonce)
            ? eth.getTransactionCount(address_1.Address.fromString(account_1.default.fromPrivate(privateKey).address))
            : Promise.resolve(tx.nonce),
    ];
    const [chainId, gasPrice, nonce] = await Promise.all(promises);
    if (isNot(chainId) || isNot(gasPrice) || isNot(nonce)) {
        throw new Error('One of the values chainId, gasPrice, or nonce could not be fetched');
    }
    return sign({ ...tx, chainId, gasPrice, nonce }, privateKey);
}
exports.signTransaction = signTransaction;
function recoverTransaction(rawTx) {
    const values = rlp_2.default.decode(rawTx);
    const signature = account_1.default.encodeSignature(values.slice(6, 9));
    const recovery = bytes_1.default.toNumber(values[6]);
    const extraData = recovery < 35 ? [] : [bytes_1.default.fromNumber((recovery - 35) >> 1), '0x', '0x'];
    const signingData = values.slice(0, 6).concat(extraData);
    const signingDataHex = rlp_2.default.encode(signingData);
    return account_1.default.recover(utils_1.sha3(signingDataHex), signature);
}
exports.recoverTransaction = recoverTransaction;
function sign(tx, privateKey) {
    if (tx.nonce < 0 || tx.gas < 0 || tx.gasPrice < 0 || tx.chainId < 0) {
        throw new Error('gas, gasPrice, nonce or chainId is lower than 0');
    }
    const chainId = utils_1.numberToHex(tx.chainId);
    const toEncode = [
        bytes_1.default.fromNat(utils_1.numberToHex(tx.nonce)),
        bytes_1.default.fromNat(utils_1.numberToHex(tx.gasPrice)),
        bytes_1.default.fromNat(utils_1.numberToHex(tx.gas)),
        tx.to ? formatters_1.inputAddressFormatter(tx.to) : '0x',
        bytes_1.default.fromNat(tx.value ? utils_1.numberToHex(tx.value) : '0x'),
        tx.data ? utils_1.bufferToHex(tx.data) : '0x',
        bytes_1.default.fromNat(chainId || '0x1'),
        '0x',
        '0x',
    ];
    const rlpEncoded = rlp_1.encode(toEncode);
    const messageHash = utils_1.sha3(rlpEncoded);
    const signature = account_1.default.makeSigner(nat_1.default.toNumber(chainId || '0x1') * 2 + 35)(messageHash, privateKey);
    const rawTx = [...rlp_1.decode(rlpEncoded).slice(0, 6), ...account_1.default.decodeSignature(signature)];
    rawTx[6] = utils_1.makeHexEven(utils_1.trimHexLeadingZero(rawTx[6]));
    rawTx[7] = utils_1.makeHexEven(utils_1.trimHexLeadingZero(rawTx[7]));
    rawTx[8] = utils_1.makeHexEven(utils_1.trimHexLeadingZero(rawTx[8]));
    const rawTransaction = rlp_1.encode(rawTx);
    const values = rlp_1.decode(rawTransaction);
    return {
        messageHash,
        v: utils_1.trimHexLeadingZero(utils_1.bufferToHex(values[6])),
        r: utils_1.trimHexLeadingZero(utils_1.bufferToHex(values[7])),
        s: utils_1.trimHexLeadingZero(utils_1.bufferToHex(values[8])),
        rawTransaction: utils_1.bufferToHex(rawTransaction),
    };
}
exports.sign = sign;
function isNot(value) {
    return value === undefined || value === null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi10cmFuc2FjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY2NvdW50L3NpZ24tdHJhbnNhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7O0FBRUYsNkJBQXFDO0FBQ3JDLHdDQUFxQztBQUVyQyx5RUFBeUM7QUFDekMscUVBQXFDO0FBQ3JDLGlFQUFpQztBQUNqQyxpRUFBaUM7QUFDakMsOENBQXNEO0FBQ3RELG9DQUEyRjtBQXVCcEYsS0FBSyxVQUFVLGVBQWUsQ0FBQyxFQUEwQixFQUFFLFVBQWtCLEVBQUUsR0FBUTtJQUM1RixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtRQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztLQUN4QztJQUVELCtEQUErRDtJQUMvRCxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEtBQUssU0FBUyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO1FBQ25GLE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUM3QjtJQUVELHlEQUF5RDtJQUN6RCxNQUFNLFFBQVEsR0FBRztRQUNmLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQzdELEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ3JFLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ2IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0RixDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO0tBQzlCLENBQUM7SUFFRixNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFL0QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNyRCxNQUFNLElBQUksS0FBSyxDQUFDLG9FQUFvRSxDQUFDLENBQUM7S0FDdkY7SUFFRCxPQUFPLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQTFCRCwwQ0EwQkM7QUFFRCxTQUFnQixrQkFBa0IsQ0FBQyxLQUFhO0lBQzlDLE1BQU0sTUFBTSxHQUFHLGFBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsTUFBTSxTQUFTLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RCxNQUFNLFFBQVEsR0FBRyxlQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sU0FBUyxHQUFHLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1RixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDekQsTUFBTSxjQUFjLEdBQUcsYUFBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvQyxPQUFPLGlCQUFPLENBQUMsT0FBTyxDQUFDLFlBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMxRCxDQUFDO0FBUkQsZ0RBUUM7QUFFRCxTQUFnQixJQUFJLENBQUMsRUFBMEIsRUFBRSxVQUFrQjtJQUNqRSxJQUFJLEVBQUUsQ0FBQyxLQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFRLEdBQUcsQ0FBQyxFQUFFO1FBQ3ZFLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztLQUNwRTtJQUVELE1BQU0sT0FBTyxHQUFHLG1CQUFXLENBQUMsRUFBRSxDQUFDLE9BQVEsQ0FBQyxDQUFDO0lBRXpDLE1BQU0sUUFBUSxHQUFHO1FBQ2YsZUFBSyxDQUFDLE9BQU8sQ0FBQyxtQkFBVyxDQUFDLEVBQUUsQ0FBQyxLQUFNLENBQUMsQ0FBQztRQUNyQyxlQUFLLENBQUMsT0FBTyxDQUFDLG1CQUFXLENBQUMsRUFBRSxDQUFDLFFBQVMsQ0FBQyxDQUFDO1FBQ3hDLGVBQUssQ0FBQyxPQUFPLENBQUMsbUJBQVcsQ0FBQyxFQUFFLENBQUMsR0FBSSxDQUFDLENBQUM7UUFDbkMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0NBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1FBQzNDLGVBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsbUJBQVcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN0RCxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBVyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtRQUNyQyxlQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUM7UUFDL0IsSUFBSTtRQUNKLElBQUk7S0FDTCxDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQUcsWUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXBDLE1BQU0sV0FBVyxHQUFHLFlBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVyQyxNQUFNLFNBQVMsR0FBRyxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxhQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRXZHLE1BQU0sS0FBSyxHQUFVLENBQUMsR0FBRyxZQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFFaEcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLG1CQUFXLENBQUMsMEJBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsbUJBQVcsQ0FBQywwQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxtQkFBVyxDQUFDLDBCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFckQsTUFBTSxjQUFjLEdBQUcsWUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXJDLE1BQU0sTUFBTSxHQUFHLFlBQU0sQ0FBQyxjQUFjLENBQVEsQ0FBQztJQUU3QyxPQUFPO1FBQ0wsV0FBVztRQUNYLENBQUMsRUFBRSwwQkFBa0IsQ0FBQyxtQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUMsRUFBRSwwQkFBa0IsQ0FBQyxtQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUMsRUFBRSwwQkFBa0IsQ0FBQyxtQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLGNBQWMsRUFBRSxtQkFBVyxDQUFDLGNBQWMsQ0FBQztLQUM1QyxDQUFDO0FBQ0osQ0FBQztBQTFDRCxvQkEwQ0M7QUFFRCxTQUFTLEtBQUssQ0FBQyxLQUFLO0lBQ2xCLE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO0FBQy9DLENBQUMifQ==