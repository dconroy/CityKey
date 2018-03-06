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
          components: [
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
              type: "uint256"
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
          name: "",
          type: "tuple"
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
          type: "uint256"
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
          type: "uint256"
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
    "0x6731cec4316f10dbc7739403fef12de3f23e42b6"
  );
  return CityCardContractObj;
}

const CityCardContract = CityCardContractSetup();

export default CityCardContract;
