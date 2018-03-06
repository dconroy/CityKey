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
const CurrentSharesArea = styled.div`
  margin-bottom: 20px;
`;
const CurrentSharesNumber = styled.span`
  color: white;
`;
const FormBuyshares = styled.form``;
const FormRow = styled.div``;
const BtnBuyShares = styled.button``;
const NextButton = styled.button`
  margin-top: 20px;
`;
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

    CityCardContract.updateCityKeyId(newID, (error, txHash) => {
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
        total => {
          console.log("waitForMined complete");
          this.props.actions.buySharesSUCCESS(txHash, total);
        }
      );
    });
  }

  handleInputChange(event) {
    this.props.actions.updatesharesInput(event.target.value);
  }

  componentDidMount() {
    // Populate existing shares
    this.getCurrentShares();
  }

  render() {
    return (
      <SharesWrap>
        <h4>Verify Your Information</h4>
        <SubText>Please refer to your CityKey</SubText>

        <SharesArea>
          <CurrentSharesArea>
            <span>Your current data: </span>

            <CurrentSharesNumber>{this.props.sharesTotal}</CurrentSharesNumber>
          </CurrentSharesArea>

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
                  id="sharesInput"
                  type="number"
                  style={{ paddingLeft: ".5em", "font-size": "16px" }}
                  onChange={this.handleInputChange}
                  value={this.props.sharesInput}
                />
              </FormRow>
              <FormRow>
                <br />
                <BtnBuyShares onClick={this.buyShares}>
                  Submit for Review
                </BtnBuyShares>
              </FormRow>
              <FormRow>
                <br />
                {this.props.buyingInProgress ? (
                  <div>Please wait for transaction card on phone</div>
                ) : null}
              </FormRow>
            </FormBuyshares>
          )}
        </SharesArea>
        {this.props.confirmingInProgress ? (
          <div>Please confirm the transaction card on your phone</div>
        ) : null}

        <NextButton onClick={this.props.actions.buySharesDemoComplete}>
          Next
        </NextButton>
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
  };
};
const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(AppActions, dispatch) };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddIdentity);
