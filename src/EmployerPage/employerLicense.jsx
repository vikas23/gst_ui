import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { employerActions } from "../_actions";

class EmployerLicense extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    event.preventDefault();

    const { license } = this.state;
    if (license) {
      this.props.dispatch(employerActions.setLicense(license));
    }
  }
  render() {
    return (
      <form name="LicenseForm" onSubmit={this.handleSubmit}>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Enter License</ControlLabel>
          <FormControl componentClass="textarea" placeholder="textarea" />
        </FormGroup>
      </form>

    );
  }
}

function mapStateToProps(state) {
  const { allEmployees } = state.employer;
  return {
    allEmployees
  };
}

const connectedEmployerLicense = connect(mapStateToProps)(EmployerLicense);
export { connectedEmployerLicense as EmployerLicense };