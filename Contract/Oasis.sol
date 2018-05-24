pragma solidity ^0.4.19;

import "./Ownable.sol";

contract Oasis is Ownable {
	address public admin;
	//uint fund_balance;
	uint fee = 0.02 ether;

	bytes32 question1 = "oasis";
	bytes32 question2 = "ioi";
	bytes32 answer1 = "good";
	bytes32 answer2 = "notgood";
	bytes32 finalanswer = "letsgodecentralization";

	bytes32 firstKey = "QmRFgaFQuHrENKxbgVjWY1g";
	bytes32 secondKey = "5oNMbQcGz9N6PvyhZePLEqG";


	address[] public scoreBoard;

	mapping(address => player) public playerInfo;

    event ownershipTransfered(address Newowner);

	struct player{
	    uint8 score;
        bool player;
	    bytes32 keyOne;
	    bytes32 keyTwo;
	}

	function Oasis () public  {
		admin = msg.sender;
		//fund_balance = msg.value;
	}


	function gameSet (bytes32 _question1, bytes32 _question2,
	                  bytes32 _answer1, bytes32 _answer2,
	                  bytes32 _finalanswer, bytes32 _key1,  bytes32 _key2) external onlyOwner {

	     question1 = _question1;
	     question2 = _question2;
	     answer1 = _answer1;
	     answer2 = _answer2;
	     finalanswer= _finalanswer;
	     firstKey = _key1;
	     secondKey = _key2;
	    // reset the score scoreBoard
	    uint length = scoreBoard.length;
        for (uint i=0; i < length; i++) {
          delete  playerInfo[scoreBoard[i]];
					delete scoreBoard[i];
        }
    }

	function payforQuestion() public payable returns (bytes32) {
		require (msg.value == fee);

        playerInfo[msg.sender].player = true;
        scoreBoard.push(msg.sender);
	}

	function getQuestion(uint _question, address _player) public view returns (bytes32) {
		require (playerInfo[_player].player == true);
		if (_question == 1) {
		    return question1 ;
		}
		if (_question == 2) {
		    return question2 ;
		}
	}

	function checkAndTakeOwnership (bytes32 _answer) public returns (bool) {

		if (_answer == answer1) {
		   require(playerInfo[msg.sender].score == 0);
		   playerInfo[msg.sender].score ++;
		   playerInfo[msg.sender].keyOne = firstKey;
		   return true;
		}
		else if (_answer == answer2) {
           require(playerInfo[msg.sender].score == 1);
           playerInfo[msg.sender].score ++;
		   playerInfo[msg.sender].keyTwo = secondKey;
		   return true;
		}
        else if (_answer == finalanswer) {
           require(playerInfo[msg.sender].score == 2);
           playerInfo[msg.sender].score ++;
           admin = msg.sender;
           transferOwnership(admin);
           return true;
        }
	}


	function getPlayerScore(address _player) public view returns(uint8){
	   return playerInfo[_player].score;
	}


	function getAllscore() public view returns(address[], uint8[]){

	    uint length = scoreBoard.length;
        uint8[] memory _score = new uint8[](length);

        for (uint i=0; i < length; i++) {
            _score[i] = playerInfo[scoreBoard[i]].score;
        }
        return (scoreBoard, _score);
	}


	function getKey(address _player) public view returns(bytes32, bytes32){
	    return (playerInfo[_player].keyOne, playerInfo[_player].keyTwo);
	}


	function killWorld () external onlyOwner {
        selfdestruct(owner);
	}

}
