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
    CityCardContract.addIdentity(
      newCityKey,
      newName,
      newStreetAddress,
      newCity,
      newZipCode,
      newBirthdate,
      (error, txHash) => {
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
      }
    );
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
      <div>
        <h4>Your CityKey</h4>
        {this.props.buyingInProgress ? 
        <SubText>Waiting for the transaction to process, this could take a minute or two...</SubText> :
        <SubText>Create or update your personal information</SubText> }
        <div>
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
            <form className="container">
              <div className="col-6 mr-auto ml-auto cst">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    CityKey ID:{" "}
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      id="cityIDInput"
                      type="string"
                      onChange={this.handleCityInfoChange(this.props.actions.updateCityIDInput)}
                      value={this.props.cityIDInput}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Full Name: </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      id="nameInput"
                      type="string"
                      onChange={this.handleCityInfoChange(this.props.actions.updateNameInput)}
                      value={this.props.nameInput}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Street Address:{" "}
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      id="streetInput"
                      type="string"
                      onChange={this.handleCityInfoChange(this.props.actions.updateStreetInput)}
                      value={this.props.streetInput}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">City: </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      id="cityInput"
                      type="string"
                      onChange={this.handleCityInfoChange(this.props.actions.updateCityInput)}
                      value={this.props.cityInput}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Zip Code: </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      id="zipCodeInput"
                      type="string"
                      onChange={this.handleZipCodeChange}
                      value={this.props.zipCodeInput}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Birthdate: </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      id="birthdateInput"
                      type="string"
                      onChange={this.handleCityInfoChange(this.props.actions.updateBirthdateInput)}
                      value={this.props.birthdateInput}
                    />
                  </div>
                </div>
                {!this.props.buyingInProgress &&
                !this.props.confirmingInProgress ? (
                  <div>
                    <br />
                    <button
                      className="btn btn-primary btn-block cbt"
                      onClick={this.buyShares}
                    >
                      Submit
                    </button>
                  </div>
                ) : null}
                <div>
                  {this.props.buyingInProgress ? (
                    <div>Please wait for transaction on phone</div>
                  ) : null}
                </div>
              </div>
            </form>
          )}
        </div>
        {this.props.confirmingInProgress ? (
          <div><br/><br/>Please confirm the transaction on your phone<br/>(it might take up to a minute to appear)<br/></div>
        ) : <br/>}

        <div className="col-2 mr-auto ml-auto">
          <button
            className="btn btn-primary btn-block cbt"
            onClick={this.props.actions.buySharesDemoComplete}
          >
            Next
          </button>
        </div>
      </div>
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
    error: state.App.error,
    /* BEGIN Additions for DCCode2018 */
    cityIDInput: state.App.cityIDInput,
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