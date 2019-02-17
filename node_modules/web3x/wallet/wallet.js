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
const account_1 = require("../account");
const encryption_1 = require("../utils/encryption");
const DEFAULT_KEY_NAME = 'web3js_wallet';
class Wallet {
    constructor(numberOfAccounts = 0) {
        this.length = 0;
        this.accounts = [];
        this.create(numberOfAccounts);
    }
    static fromMnemonic(mnemonic, numberOfAccounts) {
        const wallet = new Wallet();
        for (let i = 0; i < numberOfAccounts; ++i) {
            const path = `m/44'/60'/0'/0/${i}`;
            wallet.add(account_1.Account.createFromMnemonicAndPath(mnemonic, path));
        }
        return wallet;
    }
    static fromSeed(seed, numberOfAccounts) {
        const wallet = new Wallet();
        for (let i = 0; i < numberOfAccounts; ++i) {
            const path = `m/44'/60'/0'/0/${i}`;
            wallet.add(account_1.Account.createFromSeedAndPath(seed, path));
        }
        return wallet;
    }
    static async fromKeystores(encryptedWallet, password) {
        const wallet = new Wallet();
        await wallet.decrypt(encryptedWallet, password);
        return wallet;
    }
    static async fromLocalStorage(password, keyName = DEFAULT_KEY_NAME) {
        if (!localStorage) {
            return;
        }
        const keystoreStr = localStorage.getItem(keyName);
        if (!keystoreStr) {
            return;
        }
        try {
            return Wallet.fromKeystores(JSON.parse(keystoreStr), password);
        }
        catch (e) {
            return;
        }
    }
    create(numberOfAccounts, entropy) {
        for (let i = 0; i < numberOfAccounts; ++i) {
            this.add(account_1.Account.create(entropy).privateKey);
        }
        return this.accounts;
    }
    get(addressOrIndex) {
        if (util_1.isNumber(addressOrIndex)) {
            return this.accounts[addressOrIndex];
        }
        return this.accounts.find(a => a && a.address.toString().toLowerCase() === addressOrIndex.toString().toLowerCase());
    }
    indexOf(addressOrIndex) {
        if (util_1.isNumber(addressOrIndex)) {
            return addressOrIndex;
        }
        return this.accounts.findIndex(a => a.address.toString().toLowerCase() === addressOrIndex.toString().toLowerCase());
    }
    add(accountOrKey) {
        const account = Buffer.isBuffer(accountOrKey) ? account_1.Account.fromPrivate(accountOrKey) : accountOrKey;
        const existing = this.get(account.address);
        if (existing) {
            return existing;
        }
        const index = this.findSafeIndex();
        this.accounts[index] = account;
        this.length++;
        return account;
    }
    remove(addressOrIndex) {
        const index = this.indexOf(addressOrIndex);
        if (index === -1) {
            return false;
        }
        delete this.accounts[index];
        this.length--;
        return true;
    }
    clear() {
        this.accounts = [];
        this.length = 0;
    }
    encrypt(password, options) {
        return Promise.all(this.currentIndexes().map(index => this.accounts[index].encrypt(password, options)));
    }
    async decrypt(encryptedWallet, password) {
        const decrypted = await Promise.all(encryptedWallet.map(keystore => encryption_1.decrypt(keystore, password)));
        decrypted.forEach(account => {
            if (!account) {
                throw new Error("Couldn't decrypt accounts. Password wrong?");
            }
            this.add(account);
        });
        return this.accounts;
    }
    async saveToLocalStorage(password, keyName = DEFAULT_KEY_NAME) {
        if (!localStorage) {
            return false;
        }
        localStorage.setItem(keyName, JSON.stringify(await this.encrypt(password)));
        return true;
    }
    findSafeIndex(pointer = 0) {
        while (this.accounts[pointer]) {
            ++pointer;
        }
        return pointer;
    }
    currentIndexes() {
        return Object.keys(this.accounts).map(key => +key);
    }
    currentAddresses() {
        return Object.entries(this.accounts).map(([, account]) => account.address);
    }
}
exports.Wallet = Wallet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3dhbGxldC93YWxsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7QUFFRiwrQkFBZ0M7QUFDaEMsd0NBQXFDO0FBRXJDLG9EQUF3RDtBQUV4RCxNQUFNLGdCQUFnQixHQUFHLGVBQWUsQ0FBQztBQUV6QyxNQUFhLE1BQU07SUFJakIsWUFBWSxtQkFBMkIsQ0FBQztRQUhqQyxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLGFBQVEsR0FBYyxFQUFFLENBQUM7UUFHOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQWdCLEVBQUUsZ0JBQXdCO1FBQ25FLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7UUFDNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxHQUFHLGtCQUFrQixDQUFDLEVBQUUsQ0FBQztZQUNuQyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMseUJBQXlCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDL0Q7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFZLEVBQUUsZ0JBQXdCO1FBQzNELE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7UUFDNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxHQUFHLGtCQUFrQixDQUFDLEVBQUUsQ0FBQztZQUNuQyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFP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