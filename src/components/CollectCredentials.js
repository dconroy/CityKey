// Frameworks
import React, { Component } from 'react'
import { uport } from '../utilities/uportSetup'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/AppActions'
import checkAddressMNID from '../utilities/checkAddressMNID'
import getShares from '../utilities/getShares'


import styled from 'styled-components'

const CredentialsWrap = styled.section`
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    position: inherit;
  }
`
const CredentialsArea = styled.section`
  text-align: center;
`
const CredsTable = styled.table`
  margin: auto;
  text-align: left;
`

const CredsLabel = styled.label`
  position: relative;
  top: 10px;
`

const CredsButton = styled.button`
  margin-top: 20px;
`

const SubText = styled.p`
  margin: 20px auto 3em auto;
  font-size: 18px;
`

const RELATIONSHIPCLAIM = 'Resident'
class CollectCredentials extends Component {

  constructor (props) {
    super(props)
    this.getCurrentShares = this.getCurrentShares.bind(this)
    this.credentialsbtnClickA = this.credentialsbtnClickA.bind(this)
    this.credentialsbtnClickB = this.credentialsbtnClickB.bind(this)
    this.credentialsbtnClickC = this.credentialsbtnClickC.bind(this)
  }

  getCurrentShares () {
    // TODO: Dump this check once MNID is default behavior
    const addr = checkAddressMNID(this.props.uport.address)
    const actions = this.props.actions
    getShares(addr, actions)
  }

  credentialsbtnClickA () {
    uport.attestCredentials({
      sub: this.props.uport.address,
      claim: {name: this.props.nameInput},
      exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,  // 30 days from now
      uriHandler: (log) => { console.log(log) }
    })
  }
  credentialsbtnClickB () {
    uport.attestCredentials({
      sub: this.props.uport.address,
      claim: {Resident: RELATIONSHIPCLAIM},
      exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,  // 30 days from now
      uriHandler: (log) => { console.log(log) }
    })
  }
  credentialsbtnClickC () {
    uport.attestCredentials({
      sub: this.props.uport.address,
      claim: {'CityKeyID': this.props.cityIDInput},
      exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,  // 30 days from now
      uriHandler: (log) => { console.log(log) }
    })
  }

  render (props) {
    return (
      <CredentialsWrap>
        <h4>Send verifiable claims</h4>
        <CredentialsArea>
          <CredsTable>
            <tbody>
              <tr>
                <td style={{"paddingRight":"8em"}}>
                  <CredsLabel>Name: {this.props.nameInput}</CredsLabel>
                </td>
                <td>
                  <CredsButton onClick={this.credentialsbtnClickA}>Send</CredsButton>
                </td>
              </tr>
              <tr>
                <td>
                  <CredsLabel>Resident: Chicago</CredsLabel>
                </td>
                <td>
                  <CredsButton onClick={this.credentialsbtnClickB}>Send</CredsButton>
                </td>
              </tr>
              <tr>
                <td>
                  <CredsLabel>CityKey ID: {this.props.cityIDInput}</CredsLabel>
                </td>
                <td>
                  <CredsButton onClick={this.credentialsbtnClickC}>Send</CredsButton>
                </td>
              </tr>
            </tbody>
          </CredsTable>
        </CredentialsArea>
        <SubText>Credentials take a moment to appear on your device.</SubText>
      </CredentialsWrap>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    uport: state.App.uport,
    cityIDInput: state.App.cityIDInput,
    nameInput: state.App.nameInput
    //sharesTotal: state.App.sharesTotal,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CollectCredentials)
