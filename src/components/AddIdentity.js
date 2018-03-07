// Frameworks
import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AppActions from "../actions/AppActions";

import CityCardContract from "../utilities/CityCardContract";
import waitForMined from "../utilities/waitForMined";
import checkAddressMNID from "../utilities/checkAddressMNID";
import getShares from "../utilities/getShares";

import styled from "styled-components";

const SharesWrap = styled.section`
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    position: inherit;
  }
`;
const SharesArea = styled.div``;
/*
const CurrentSharesArea = styled.div`
  margin-bottom: 20px;
`;
const CurrentSharesNumber = styled.span`
  color: white;
`;
*/
const FormBuyshares = styled.form``;
const FormRow = styled.div``;
const BtnBuyShares = styled.button``;
const SubText = styled.p`
  margin: 0 auto 3em auto;
  font-size: 18px;
`;

class AddIdentity extends Component {
  constructor(props) {
    super(props);
    this.getCurrentShares = this.getCurrentShares.bind(this);
    this.buyShares = this.buyShares.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    /* BEGIN Additions for DCCode2018 */
    this.handleCityKeyChange = this.handleCityKeyChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleStreetChange = this.handleStreetChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.handleBirthdateChange = this.handleBirthdateChange.bind(this);
    /* END Additions for DCCode2018 */
  }

  getCurrentShares() {
    // TODO: Dump this check once MNID is default behavior
    console.log(this.props.uport);
    const addr = checkAddressMNID(this.props.uport.address);
    const actions = this.props.actions;
    getShares(addr, actions);
  }

  buyShares(e) {
    e.preventDefault();

    console.log("buyShares");

    let newID = this.props.sharesInput;
    const addr = checkAddressMNID(this.props.uport.address);
    const actions = this.props.actions;

    console.log({ newID, addr, actions });

    this.props.actions.buySharesREQUEST(newID);

    /* BEGIN Additions for DCCode2018 */
    const newCityKey = this.props.cityIDInput;
    const newName = this.props.nameInput;
    const newStreetAddress = this.props.streetInput;
    const newCity = this.props.cityInput;
    const newZipCode = this.props.zipCodeInput;
    const newBirthdate = this.props.birthdateInput;
    /* END Additions for DCCode2018 */
        
    CityCardContract.addIdentity(newCityKey, newName, newStreetAddress, newCity, newZipCode, newBirthdate, (error, txHash) => {
      console.log("updateShares");
      if (error) {
        this.props.actions.buySharesERROR(error);
      }
      waitForMined(
        addr,
        txHash,
        { blockNumber: null },
        actions,
        () => {
          this.props.actions.buySharesPENDING();
        },
        () => {
          console.log("waitForMined complete");
          this.props.actions.buySharesSUCCESS(txHash);
        }
      );
    });
  }

  handleInputChange(event) {
    this.props.actions.updatesharesInput(event.target.value);
  }

  /* BEGIN Additions for DCCode2018 */  
  handleCityKeyChange(event) {
    this.props.actions.updateCityIDInput(event.target.value);
  }
  handleNameChange(event) {
    this.props.actions.updateNameInput(event.target.value);
  }
  handleCityChange(event) {
    this.props.actions.updateCityInput(event.target.value);
  }
  handleStreetChange(event) {
    this.props.actions.updateStreetInput(event.target.value);
  }
  handleZipCodeChange(event) {
    this.props.actions.updateZipCodeInput(event.target.value);
  }
  handleBirthdateChange(event) {
    this.props.actions.updateBirthdateInput(event.target.value);
  }
  /* END Additions for DCCode2018 */

  componentDidMount() {
    // Populate existing shares
    this.getCurrentShares();
  }

  render() {
    const cityKey = this.props.cityIDInput;
    const name = this.props.nameInput;
    const streetAddress = this.props.streetInput
    const city = this.props.cityInput;
    const zipCode = this.props.zipCodeInput;
    const birthdate = this.props.birthdateInput;
    return (
      <SharesWrap>
        <h4>Your CityKey</h4>
        {!this.props.buyingInProgress || !this.props.confirmingInProgress ? 
        <SubText>Create or update your personal information</SubText> :
        <SubText>Waiting for the transaction to process, this could take a minute or two...</SubText> }

        <SharesArea>

          {this.props.buyingInProgress ? (
            <div>
              <br />
              <div className="spinner center">
                {[...Array(12)].map((x, i) => (
                  <div className="spinner-blade" key={i} />
                ))}
              </div>
              <br />
            </div>
          ) : (
            <FormBuyshares>
              <FormRow>
                <label>CityKey ID: </label>
                <input
                  id="cityIDInput"
                  type="string"
                  style={{ paddingLeft: ".5em", "font-size": "16px" }}
                  onChange={this.handleCityKeyChange}
                  value={cityKey}
                />
              </FormRow>
              <FormRow>
                <label>Full Name: </label>
                <input
                  id="nameInput"
                  type="string"
                  style={{ paddingLeft: ".5em", "font-size": "16px" }}
                  onChange={this.handleNameChange}
                  value={name}
                />
              </FormRow>
              <FormRow>
                <label>Street Address: </label>
                <input
                  id="streetInput"
                  type="string"
                  style={{ paddingLeft: ".5em", "font-size": "16px" }}
                  onChange={this.handleStreetChange}
                  value={streetAddress}
                />
              </FormRow>
              <FormRow>
                <label>City: </label>
                <input
                  id="cityInput"
                  type="string"
                  style={{ paddingLeft: ".5em", "font-size": "16px" }}
                  onChange={this.handleCityChange}
                  value={city}
                />
              </FormRow>
              <FormRow>
                <label>Zip Code: </label>
                <input
                  id="zipCodeInput"
                  type="number"
                  style={{ paddingLeft: ".5em", "font-size": "16px" }}
                  onChange={this.handleZipCodeChange}
                  value={zipCode}
                />
              </FormRow>
              <FormRow>
                <label>Birthdate: </label>
                <input
                  id="birthdateInput"
                  type="string"
                  style={{ paddingLeft: ".5em", "font-size": "16px" }}
                  onChange={this.handleBirthdateChange}
                  value={birthdate}
                />
              </FormRow>
              {!this.props.buyingInProgress && !this.props.confirmingInProgress ? (
              <FormRow>
                <br />
                <BtnBuyShares onClick={this.buyShares}>
                  Submit
                </BtnBuyShares>
              </FormRow>) : null}
              <FormRow>
                {this.props.buyingInProgress ? (
                  <div>Please wait for transaction on phone</div>
                ) : null}
              </FormRow>
            </FormBuyshares>
          )}
        </SharesArea>
        {this.props.confirmingInProgress ? (
          <div><br/>Please confirm the transaction on your phone</div>
        ) : null}
      </SharesWrap>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    uport: state.App.uport,
    sharesInput: state.App.sharesInput,
    gettingShares: state.App.gettingShares,
    confirmingInProgress: state.App.confirmingInProgress,
    sharesTotal: state.App.sharesTotal,
    buyingInProgress: state.App.buyingInProgress,
    tx: state.App.tx,
    error: state.App.error

    /* BEGIN Additions for DCCode2018 */
    ,cityIDInput: state.App.cityIDInput,
    nameInput: state.App.nameInput,
    streetInput: state.App.streetInput,
    cityInput: state.App.cityInput,
    zipCodeInput: state.App.zipCodeInput,
    birthdateInput: state.App.birthdateInput
    /* END Additions for DCCode2018 */
  };
};
const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(AppActions, dispatch) };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddIdentity);
