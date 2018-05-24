const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/teochFL5M5Cc6eidkmI5"));
var Accounts = require('web3-eth-accounts');
var accounts = new Accounts('https://rinkeby.infura.io/teochFL5M5Cc6eidkmI5');
//var abi = require('./abi');


//var contractAddress = '0x1e5486e28f2456b4e6fcb780969feb80b77e8c22';

//var mycontract = new web3.eth.Contract(abi, contractAddress);

var u1_pk = "0x123ce564d427a3319b6536bbcef1390d69395b06es6c481954e971d960fe8907";

var answear = ("0xg"+"whatever");

console.log(web3.utils.asciiToHex("letsgodecentralization"));
//console.log(web3.utils.hexToAscii('0x516d524667614651754872454e4b786267566a57593167000000000000000000'))

//var getData = mycontract.methods.checkAndTakeOwnership(web3.utils.asciiToHex(answear)).encodeABI();


// var signed_transaction = web3.eth.accounts.signTransaction(
//
//   {
//     to: contractAddress,
//     data:getData,
//     gas: 5000000,
//     gasLimit:9000000
//
//   }, u1_pk).then(function(raw){
//
//   web3.eth.sendSignedTransaction(raw[Object.keys(raw)[4]]).on('receipt', function(result){
//     console.log(result);
// })
//
// })

//
// mycontract.methods.admin('0x648A67564379AE8486dc6E29A5Aaf5fc4576Bc45').call().then(function(Resp){
//       console.log(Resp);
//     })
