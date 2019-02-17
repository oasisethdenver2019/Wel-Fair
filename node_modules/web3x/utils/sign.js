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
const address_1 = require("../address");
const account_1 = require("../eth-lib/account");
const hash_message_1 = require("./hash-message");
function sign(data, privateKey) {
    const messageHash = hash_message_1.hashMessage(data);
    const signature = account_1.sign(messageHash, privateKey);
    const vrs = account_1.decodeSignature(signature);
    return {
        message: data,
        messageHash,
        v: vrs[0],
        r: vrs[1],
        s: vrs[2],
        signature,
    };
}
exports.sign = sign;
function recoverFromSignature(signature) {
    const { messageHash, v, r, s } = signature;
    return recoverFromSigString(messageHash, account_1.encodeSignature([v, r, s]), true);
}
exports.recoverFromSignature = recoverFromSignature;
function recoverFromVRS(message, v, r, s, prefixed = false) {
    if (!prefixed) {
        message = hash_message_1.hashMessage(message);
    }
    return recoverFromSigString(message, account_1.encodeSignature([v, r, s]), true);
}
exports.recoverFromVRS = recoverFromVRS;
function recoverFromSigString(message, signature, preFixed = false) {
    if (!preFixed) {
        message = hash_message_1.hashMessage(message);
    }
    return address_1.Address.fromString(account_1.recover(message, signature));
}
exports.recoverFromSigString = recoverFromSigString;
function recover(...args) {
    switch (args.length) {
        case 1:
            return recoverFromSignature(args[0]);
        case 2:
        case 3:
            return recoverFromSigString(args[0], args[1], args[2]);
        case 4:
        case 5:
            return recoverFromVRS(args[0], args[1], args[2], args[3], args[4]);
    }
    throw new Error('Cannot determine recovery function');
}
exports.recover = recover;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9zaWduLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7O0FBRUYsd0NBQXFDO0FBQ3JDLGdEQUFvSDtBQUNwSCxpREFBNkM7QUFXN0MsU0FBZ0IsSUFBSSxDQUFDLElBQVksRUFBRSxVQUFrQjtJQUNuRCxNQUFNLFdBQVcsR0FBRywwQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sU0FBUyxHQUFHLGNBQVUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDdEQsTUFBTSxHQUFHLEdBQUcseUJBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QyxPQUFPO1FBQ0wsT0FBTyxFQUFFLElBQUk7UUFDYixXQUFXO1FBQ1gsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDVCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1QsU0FBUztLQUNWLENBQUM7QUFDSixDQUFDO0FBWkQsb0JBWUM7QUFFRCxTQUFnQixvQkFBb0IsQ0FBQyxTQUFvQjtJQUN2RCxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDO0lBQzNDLE9BQU8sb0JBQW9CLENBQUMsV0FBVyxFQUFFLHlCQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDN0UsQ0FBQztBQUhELG9EQUdDO0FBRUQsU0FBZ0IsY0FBYyxDQUFDLE9BQWUsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxXQUFvQixLQUFLO0lBQ3hHLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixPQUFPLEdBQUcsMEJBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNoQztJQUNELE9BQU8sb0JBQW9CLENBQUMsT0FBTyxFQUFFLHlCQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDekUsQ0FBQztBQUxELHdDQUtDO0FBRUQsU0FBZ0Isb0JBQW9CLENBQUMsT0FBZSxFQUFFLFNBQWlCLEVBQUUsV0FBb0IsS0FBSztJQUNoRyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2IsT0FBTyxHQUFHLDBCQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDaEM7SUFFRCxPQUFPLGlCQUFPLENBQUMsVUFBVSxDQUFDLGlCQUFhLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQU5ELG9EQU1DO0FBS0QsU0FBZ0IsT0FBTyxDQUFDLEdBQUcsSUFBVztJQUNwQyxRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDbkIsS0FBSyxDQUFDO1lBQ0osT0FBTyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxLQUFLLENBQUMsQ0FBQztRQUNQLEtBQUssQ0FBQztZQUNKLE9BQU8sb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxLQUFLLENBQUMsQ0FBQztRQUNQLEtBQUssQ0FBQztZQUNKLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN0RTtJQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBWkQsMEJBWUMifQ==