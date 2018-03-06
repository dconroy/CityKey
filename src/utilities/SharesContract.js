import { web3 } from './uportSetup'

function SharesContractSetup () {
  let SharesABI = web3.eth.contract([{"constant":false,"inputs":[{"name":"bid","type":"uint256"}],"name":"updateShares","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"buyers","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"}])
  let SharesContractObj = SharesABI.at('0x65CbaEbA3816BAeaEE21538BD1A3ACb09486983D')
  return SharesContractObj
}

const SharesContract = SharesContractSetup()

export default SharesContract
