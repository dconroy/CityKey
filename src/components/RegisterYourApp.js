// Frameworks
import React, { Component } from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/AppActions'

const RegisterYourAppWrap = styled.section``
const NextButton = styled.button`
  margin-top: 20px;
`
const Link = styled.a`
  display: block;
`


class RegisterYourApp extends Component {
  render () {
    return (
      <RegisterYourAppWrap>
        <h4>More Information Regarding CityKey and uPort</h4>
        <br/>
        <Link className='external' target='_blank' href='http://developer.uport.me'>
          Full Documentation for uPort.
        </Link>
        <br/>
        <Link className='external' target='_blank' href='http://www.chicityclerk.com/chicagocitykey'>
          More Information about the Chicago CityKey Program.
        </Link>

        <br/>

        <NextButton
          onClick={this.props.actions.registerAppAreaComplete}>
          Next
        </NextButton>

      </RegisterYourAppWrap>
    )
  }
}

const mapStateToProps = (state, props) => {
  return { }
}
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterYourApp)
