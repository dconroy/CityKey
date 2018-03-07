let initialState = {
  sharesInput: 0 // Stupid FB warning about controlled inputs

   /* BEGIN Additions for DCCode2018 */
   ,cityIDInput: ''
   ,nameInput: ''
   ,streetInput: ''
   ,cityInput: ''
   ,zipCodeInput: ''
   ,birthdateInput: ''
   /* END Additions for DCCode2018 */
}

export default(state = initialState, payload) => {
  switch (payload.type) {
    case 'CONNECT_UPORT':
      return {
        ...state,
        uport: payload.data,
        signTransactionPage: true
      }
      
    case 'GET_CURRENT_SHARES_REQUEST':
      return {
        ...state,
        gettingShares: true
      }
    case 'GET_CURRENT_SHARES_SUCCESS':
      return {
        ...state,
        gettingShares: false,
        sharesTotal: 0 // deprecated
        /* BEGIN Additions for DCCode2018 */
        /* NOTE: Order or values here depends on order of return values of 'getIdentity' function in smart contract */
        ,cityIDInput: payload.data[0]
        ,nameInput: payload.data[1]
        ,streetInput: payload.data[2]
        ,cityInput: payload.data[3]
        ,zipCodeInput: payload.data[4]
        ,birthdateInput: payload.data[5]
        /* END Additions for DCCode2018 */
      }
    case 'GET_CURRENT_SHARES_ERROR':
      return {
        ...state,
        gettingShares: false,
        error: payload.data
      }
    case 'UPDATE_SHARES_INPUT':
      return {
        ...state,
        sharesInput: payload.data
      }

    case 'BUY_SHARES_REQUEST':
      return {
        ...state,
        confirmingInProgress: true
      }
    case 'BUY_SHARES_PENDING':
      return {
        ...state,
        buyingInProgress: true,
        confirmingInProgress: false
      }
    case 'BUY_SHARES_SUCCESS':
      return {
        ...state,
        txHash: payload.tx,
        buyingInProgress: false
      }
    case 'BUY_SHARES_ERROR':
      return {
        ...state,
        buyingInProgress: false,
        sharesTotal: payload.data
      }

    case 'BUY_SHARES_DEMO_COMPLETE':
      return {
        ...state,
        collectCredentialsPage: true
      }

    case 'CREDENTIALS_DEMO_COMPLETE':
      return {
        ...state,
        registerYourAppPage: true
      }
    case 'LOGOUT':
      return {
        ...state,
        uport: null,
        logOutPage: true
      }

    /* BEGIN Additions for DCCode2018 */
    case 'UPDATE_CITY_ID_INPUT':
      return {
        ...state,
        cityIDInput: payload.data
      }
    case 'UPDATE_NAME_INPUT':
      return {
        ...state,
        nameInput: payload.data
      }
    case 'UPDATE_STREET_INPUT':
      return {
        ...state,
        streetInput: payload.data
      }
    case 'UPDATE_CITY_INPUT':
      return {
        ...state,
        cityInput: payload.data
      }
    case 'UPDATE_ZIP_CODE_INPUT':
      return {
        ...state,
        zipCodeInput: payload.data
      }
    case 'UPDATE_BIRTHDATE_INPUT':
      return {
        ...state,
        birthdateInput: payload.data
      }
    /* END Additions for DCCode2018 */

    default:
      return state
  }
}
