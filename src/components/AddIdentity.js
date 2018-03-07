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
  handleCityInfoChange(action) {
    return function(event) {
      action(event.target.value);
    }
  }
  /* END Additions for DCCode2018 */

  componentDidMount() {
    // Populate existing shares
    this.getCurrentShares();
  }

  render() {
    return (
      <SharesWrap>
        <h4>Your CityKey</h4>
        {this.props.buyingInProgress ? 
        <SubText>Waiting for the transaction to process, this could take a minute or two...</SubText> :
        <SubText>Create or update your personal information</SubText> }

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
                  onChange={this.handleCityInfoChange(this.props.actions.updateCityIDInput)}
                  value={this.props.cityIDInput}
                />
              </FormRow>
              <FormRow>
                <label>Full Name: </label>
                <input
                  id="nameInput"
                  type="string"
                  style={{ paddingLeft: ".5em", "font-size": "16px" }}
                  onChange={this.handleCityInfoChange(this.props.actions.updateNameInput)}
                  value={this.props.nameInput}
                />
              </FormRow>
              <FormRow>
                <label>Street Address: </label>
                <input
                  id="streetInput"
                  type="string"
                  style={{ paddingLeft: ".5em", "font-size": "16px" }}
                  onChange={this.handleCityInfoChange(this.props.actions.updateStreetInput)}
                  value={this.props.streetInput}
                />
              </FormRow>
              <FormRow>
                <label>City: </label>
                <input
                  id="cityInput"
                  type="string"
                  style={{ paddingLeft: ".5em", "font-size": "16px" }}
                  onChange={this.handleCityInfoChange(this.props.actions.updateCityInput)}
                  value={this.props.cityInput}
                />
              </FormRow>
              <FormRow>
                <label>Zip Code: </label>
                <input
                  id="zipCodeInput"
                  type="string"
                  style={{ paddingLeft: ".5em", "font-size": "16px" }}
                  onChange={this.handleCityInfoChange(this.props.actions.updateZipCodeInput)}
                  value={this.props.zipCodeInput}
                />
              </FormRow>
              <FormRow>
                <label>Birthdate: </label>
                <input
                  id="birthdateInput"
                  type="string"
                  style={{ paddingLeft: ".5em", "font-size": "16px" }}
                  onChange={this.handleCityInfoChange(this.props.actions.updateBirthdateInput)}
                  value={this.props.birthdateInput}
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
