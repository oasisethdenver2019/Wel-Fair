"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("./bignumber");
const AddressZero = '0x0000000000000000000000000000000000000000';
exports.AddressZero = AddressZero;
const HashZero = '0x0000000000000000000000000000000000000000000000000000000000000000';
exports.HashZero = HashZero;
// NFKD (decomposed)
//const EtherSymbol = '\uD835\uDF63';
// NFKC (composed)
const EtherSymbol = '\u039e';
exports.EtherSymbol = EtherSymbol;
const NegativeOne = bignumber_1.bigNumberify(-1);
exports.NegativeOne = NegativeOne;
const Zero = bignumber_1.bigNumberify(0);
exports.Zero = Zero;
const One = bignumber_1.bigNumberify(1);
exports.One = One;
const Two = bignumber_1.bigNumberify(2);
exports.Two = Two;
const WeiPerEther = bignumber_1.bigNumberify('1000000000000000000');
exports.WeiPerEther = WeiPerEther;
const MaxUint256 = bignumber_1.bigNumberify('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
exports.MaxUint256 = MaxUint256;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V0aGVycy9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBc0Q7QUFFdEQsTUFBTSxXQUFXLEdBQUcsNENBQTRDLENBQUM7QUFnQnhELGtDQUFXO0FBZnBCLE1BQU0sUUFBUSxHQUFHLG9FQUFvRSxDQUFDO0FBZWhFLDRCQUFRO0FBYjlCLG9CQUFvQjtBQUNwQixxQ0FBcUM7QUFFckMsa0JBQWtCO0FBQ2xCLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQztBQVNHLGtDQUFXO0FBUDNDLE1BQU0sV0FBVyxHQUFjLHdCQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQU9ILGtDQUFXO0FBTnhELE1BQU0sSUFBSSxHQUFjLHdCQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFNa0Isb0JBQUk7QUFMOUQsTUFBTSxHQUFHLEdBQWMsd0JBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUt5QixrQkFBRztBQUpuRSxNQUFNLEdBQUcsR0FBYyx3QkFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBSThCLGtCQUFHO0FBSHhFLE1BQU0sV0FBVyxHQUFjLHdCQUFZLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUdPLGtDQUFXO0FBRnJGLE1BQU0sVUFBVSxHQUFjLHdCQUFZLENBQUMsb0VBQW9FLENBQUMsQ0FBQztBQUUxQixnQ0FBVSJ9