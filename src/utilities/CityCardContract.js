import { web3 } from "./uportSetup";

function CityCardContractSetup() {
  let CityCardABI = web3.eth.contract([
    {
      constant: true,
      inputs: [
        {
          name: "_address",
          type: "address"
        }
      ],
      name: "getIdentity",
      outputs: [
        {
          name: "",
          type: "string"
        },
        {
          name: "",
          type: "string"
        },
        {
          name: "",
          type: "string"
        },
        {
          name: "",
          type: "string"
        },
        {
          name: "",
          type: "string"
        },
        {
          name: "",
          type: "string"
        },
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "contractOwner",
      outputs: [
        {
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "",
          type: "address"
        }
      ],
      name: "cards",
      outputs: [
        {
          name: "cityKeyId",
          type: "string"
        },
        {
          name: "name",
          type: "string"
        },
        {
          name: "streetAddress",
          type: "string"
        },
        {
          name: "city",
          type: "string"
        },
        {
          name: "zipcode",
          type: "string"
        },
        {
          name: "birthdate",
          type: "string"
        },
        {
          name: "attested",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "",
          type: "address"
        }
      ],
      name: "approvedCityOfficial",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "_cityKeyId",
          type: "string"
        },
        {
          name: "_name",
          type: "string"
        },
        {
          name: "_streetAddress",
          type: "string"
        },
        {
          name: "_city",
          type: "string"
        },
        {
          name: "_zipcode",
          type: "string"
        },
        {
          name: "_birthdate",
          type: "string"
        }
      ],
      name: "addIdentity",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "_address",
          type: "address"
        }
      ],
      name: "attestCredentials",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "_address",
          type: "address"
        },
        {
          name: "_cityKeyId",
          type: "string"
        }
      ],
      name: "updateCityKeyId",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    }
  ]);
  let CityCardContractObj = CityCardABI.at(
    "0xdb18d9940034ba486182f97f6d61322e680505ca"
  );
  return CityCardContractObj;
}

const CityCardContract = CityCardContractSetup();

export default CityCardContract;
