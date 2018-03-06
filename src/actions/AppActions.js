// //////////////////////////////////////////////
// Connect uPort
// //////////////////////////////////////////////

export const connectUport = (data) => {
  return {
    type: 'CONNECT_UPORT',
    data
  }
}

// //////////////////////////////////////////////
// Get Current Shares
// //////////////////////////////////////////////

export const getCurrentSharesREQUEST = () => {
  return {
    type: 'GET_CURRENT_SHARES_REQUEST'
  }
}
export const getCurrentSharesSUCCESS = (data) => {
  return {
    type: 'GET_CURRENT_SHARES_SUCCESS',
    data
  }
}
export const getCurrentSharesERROR = (data) => {
  return {
    type: 'GET_CURRENT_SHARES_ERROR',
    data
  }
}

export const updatesharesInput = (data) => {
  return {
    type: 'UPDATE_SHARES_INPUT',
    data
  }
}

/* BEGIN Additions for DCCode2018 */
export const updateCityIDInput = (data) => {
  return {
    type: 'UPDATE_CITY_ID_INPUT',
    data
  }
}
export const updateNameInput = (data) => {
  return {
    type: 'UPDATE_NAME_INPUT',
    data
  }
}
export const updateStreetInput = (data) => {
  return {
    type: 'UPDATE_STREET_INPUT',
    data
  }
}
export const updateCityInput = (data) => {
  return {
    type: 'UPDATE_CITY_INPUT',
    data
  }
}
export const updateZipCodeInput = (data) => {
  return {
    type: 'UPDATE_ZIP_CODE_INPUT',
    data
  }
}
export const updateBirthdateInput = (data) => {
  return {
    type: 'UPDATE_BIRTHDATE_INPUT',
    data
  }
}
/* END Additions for DCCode2018 */

// //////////////////////////////////////////////
// Buy Shares
// //////////////////////////////////////////////

export const buySharesREQUEST = (tx, amount) => {
  return {
    type: 'BUY_SHARES_REQUEST',
    amount: amount,
    buyingInProgress: true
  }
}
export const buySharesPENDING = () => {
  return {
    type: 'BUY_SHARES_PENDING'
  }
}
export const buySharesSUCCESS = (tx, data) => {
  return {
    type: 'BUY_SHARES_SUCCESS',
    tx: tx,
    data
  }
}
export const buySharesERROR = (data) => {
  return {
    type: 'BUY_SHARES_ERROR',
    data
  }
}

// //////////////////////////////////////////////
// Complete Buy Shares Demo
// //////////////////////////////////////////////

export const buySharesDemoComplete = (data) => {
  return {
    type: 'BUY_SHARES_DEMO_COMPLETE'
  }
}

// //////////////////////////////////////////////
// Complete Credentials Demo
// //////////////////////////////////////////////

export const credentialsDemoComplete = (data) => {
  return {
    type: 'CREDENTIALS_DEMO_COMPLETE'
  }
}

// //////////////////////////////////////////////
// Register App Area Complete
// //////////////////////////////////////////////

export const registerAppAreaComplete = (data) => {
  return {
    type: 'LOGOUT'
  }
}
