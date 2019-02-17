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
const bip39_1 = tslib_1.__importDefault(require("bip39"));
const hdkey_1 = tslib_1.__importDefault(require("hdkey"));
const address_1 = require("../address");
const account_1 = require("../eth-lib/account");
const send_tx_1 = require("../eth/send-tx");
const utils_1 = require("../utils");
const sign_1 = require("../utils/sign");
const sign_transaction_1 = require("./sign-transaction");
class Account {
    constructor(address, privateKey, publicKey) {
        this.address = address;
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }
    static create(entropy = utils_1.randomBuffer(32)) {
        const { privateKey, address, publicKey } = account_1.create(entropy);
        return new Account(address_1.Address.fromString(address), privateKey, publicKey);
    }
    static fromPrivate(privateKey) {
        const { address, publicKey } = account_1.fromPrivate(privateKey);
        return new Account(address_1.Address.fromString(address), privateKey, publicKey);
    }
    static createFromMnemonicAndPath(mnemonic, derivationPath) {
        const seed = bip39_1.default.mnemonicToSeed(mnemonic);
        return Account.createFromSeedAndPath(seed, derivationPath);
    }
    static createFromSeedAndPath(seed, derivationPath) {
        const root = hdkey_1.default.fromMasterSeed(seed);
        const addrNode = root.derive(derivationPath);
        const privateKey = addrNode.privateKey;
        return Account.fromPrivate(privateKey);
    }
    static async fromKeystore(v3Keystore, password, nonStrict = false) {
        return Account.fromPrivate(await utils_1.decrypt(v3Keystore, password, nonStrict));
    }
    sendTransaction(tx, eth) {
        const promise = new Promise(async (resolve, reject) => {
            try {
                const signedTx = await sign_transaction_1.signTransaction(tx, this.privateKey, eth);
                resolve(await eth.sendSignedTransaction(signedTx.rawTransaction).getTxHash());
            }
            catch (err) {
                reject(err);
            }
        });
        return new send_tx_1.SentTransaction(eth, promise);
    }
    signTransaction(tx, eth) {
        return sign_transaction_1.signTransaction(tx, this.privateKey, eth);
    }
    sign(data) {
        return sign_1.sign(data, this.privateKey);
    }
    encrypt(password, options) {
        return utils_1.encrypt(this.privateKey, this.address, password, options);
    }
}
exports.Account = Account;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY2NvdW50L2FjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7O0FBRUYsMERBQTBCO0FBQzFCLDBEQUEwQjtBQUMxQix3Q0FBcUM7QUFFckMsZ0RBQXlEO0FBQ3pELDRDQUF5RDtBQUV6RCxvQ0FBb0U7QUFDcEUsd0NBQXFDO0FBQ3JDLHlEQUE2RTtBQVk3RSxNQUFhLE9BQU87SUFDbEIsWUFBcUIsT0FBZ0IsRUFBVyxVQUFrQixFQUFXLFNBQWlCO1FBQXpFLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBVyxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQVcsY0FBUyxHQUFULFNBQVMsQ0FBUTtJQUFHLENBQUM7SUFFM0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFrQixvQkFBWSxDQUFDLEVBQUUsQ0FBQztRQUNyRCxNQUFNLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNELE9BQU8sSUFBSSxPQUFPLENBQUMsaUJBQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQWtCO1FBQzFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcscUJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RCxPQUFPLElBQUksT0FBTyxDQUFDLGlCQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRU0sTUFBTSxDQUFDLHlCQUF5QixDQUFDLFFBQWdCLEVBQUUsY0FBc0I7UUFDOUUsTUFBTSxJQUFJLEdBQUcsZUFBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxPQUFPLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVNLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFZLEVBQUUsY0FBc0I7UUFDdEUsTUFBTSxJQUFJLEdBQUcsZUFBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDdkMsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUE2QixFQUFFLFFBQWdCLEVBQUUsU0FBUyxHQUFHLEtBQUs7UUFDakcsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sZUFBTyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU0sZUFBZSxDQUFDLEVBQWEsRUFBRSxHQUFRO1FBQzVDLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFrQixLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JFLElBQUk7Z0JBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxrQ0FBZSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNqRSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7YUFDL0U7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDYjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLHlCQUFlLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxlQUFlLENBQUMsRUFBYSxFQUFFLEdBQVE7UUFDNUMsT0FBTyxrQ0FBZSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTSxJQUFJLENBQUMsSUFBWTtRQUN0QixPQUFPLFdBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxPQUFPLENBQUMsUUFBZ0IsRUFBRSxPQUFhO1FBQzVDLE9BQU8sZUFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUNGO0FBcERELDBCQW9EQyJ9