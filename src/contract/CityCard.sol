pragma experimental ABIEncoderV2;
pragma solidity ^0.4.17;

contract CityCard {
    
    struct Card {
        string cityKeyId;
        string name;
        string streetAddress;
        string city;
        uint zipcode; 
        string birthdate;
        bool attested;
    }
    
    address public contractOwner;
    
	mapping (address => Card) public cards;
	mapping (address => bool) public approvedCityOfficial;
	
	function CityCard () public {
	    contractOwner = msg.sender;
	    approvedCityOfficial[msg.sender] = true;
	    approvedCityOfficial[0x9A5C08ca7E904aED24B155628e5ac0041639F06a] = true;
	    approvedCityOfficial[0x55dbb8BB300e40F82a561245f118f96058736761] = true;
	    approvedCityOfficial[0x8643cDb1b88eCe3afecb69Bc73D9100bb39e8cA7] = true;
	}

	function addIdentity(string _cityKeyId, 
	                    string _name, 
	                    string _streetAddress, 
	                    string _city, 
	                    uint _zipcode, 
	                    string _birthdate) public {
	   Card memory newCard = Card({
	       cityKeyId: _cityKeyId, 
	       name: _name, 
	       streetAddress: _streetAddress, 
	       city: _city, 
	       zipcode: _zipcode, 
	       birthdate: _birthdate,
	       attested: false
	   });
	   
	   cards[msg.sender] = newCard;
	}
	
	function getIdentity(address _address) public view returns (Card) {
	    return cards[_address];
	}
	
	function updateCityKeyId(address _address, string _cityKeyId) public {
	    require(!cards[_address].attested);
	    cards[_address].cityKeyId = _cityKeyId;
	}
	
	function attestCredentials(address _address) public {
	    require(approvedCityOfficial[msg.sender]);
	    cards[_address].attested = true;
	}

}