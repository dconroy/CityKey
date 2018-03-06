pragma solidity ^0.4.8;

contract Shares {
	mapping (address => uint) shares;
	
	// Array of buyers
   address[] public buyers;

	function updateShares(uint bid) {
		shares[msg.sender] =  bid;
	}

	function getShares(address addr) returns(uint) {
    	return shares[addr];
  }
}
