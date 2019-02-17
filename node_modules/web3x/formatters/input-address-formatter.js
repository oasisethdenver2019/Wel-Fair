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
const util_1 = require("util");
const address_1 = require("../address");
const iban_1 = require("../iban");
function inputAddressFormatter(address) {
    if (util_1.isString(address)) {
        const iban = new iban_1.Iban(address);
        if (iban.isValid() && iban.isDirect()) {
            return iban
                .toAddress()
                .toString()
                .toLowerCase();
        }
        else if (address_1.Address.isAddress(address)) {
            return address_1.Address.fromString(address)
                .toString()
                .toLowerCase();
        }
        throw new Error(`Address ${address} is invalid, the checksum failed, or its an indrect IBAN address.`);
    }
    else if (address instanceof iban_1.Iban) {
        return address
            .toAddress()
            .toString()
            .toLowerCase();
    }
    else {
        return address.toString().toLowerCase();
    }
}
exports.inputAddressFormatter = inputAddressFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtYWRkcmVzcy1mb3JtYXR0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZm9ybWF0dGVycy9pbnB1dC1hZGRyZXNzLWZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOztBQUVGLCtCQUFnQztBQUNoQyx3Q0FBcUM7QUFDckMsa0NBQStCO0FBRS9CLFNBQWdCLHFCQUFxQixDQUFDLE9BQWdDO0lBQ3BFLElBQUksZUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNyQyxPQUFPLElBQUk7aUJBQ1IsU0FBUyxFQUFFO2lCQUNYLFFBQVEsRUFBRTtpQkFDVixXQUFXLEVBQUUsQ0FBQztTQUNsQjthQUFNLElBQUksaUJBQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDckMsT0FBTyxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7aUJBQy9CLFFBQVEsRUFBRTtpQkFDVixXQUFXLEVBQUUsQ0FBQztTQUNsQjtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxPQUFPLG1FQUFtRSxDQUFDLENBQUM7S0FDeEc7U0FBTSxJQUFJLE9BQU8sWUFBWSxXQUFJLEVBQUU7UUFDbEMsT0FBTyxPQUFPO2FBQ1gsU0FBUyxFQUFFO2FBQ1gsUUFBUSxFQUFFO2FBQ1YsV0FBVyxFQUFFLENBQUM7S0FDbEI7U0FBTTtRQUNMLE9BQU8sT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3pDO0FBQ0gsQ0FBQztBQXRCRCxzREFzQkMifQ==