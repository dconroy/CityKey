import { Connect, SimpleSigner } from 'uport-connect'
require('dotenv').config();

const uport = new Connect('CityKey', {
  clientId: '2odskpGoLjddN7pstNqNbz1SmnHtYJp9qpY',
  network: 'rinkeby',
  signer: SimpleSigner('8b18e7e886547cada0b9da42f02126bef7bbb418c56f6031d3217aaf3dc4a08b')
})

const web3 = uport.getWeb3()
export { web3, uport }
