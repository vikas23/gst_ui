import React, { Component } from "react";
import { Table, Button, Modal, FormGroup } from "react-bootstrap";
import { connect } from "react-redux";

import { employeeActions } from "../_actions";

const FILETYPE = {
  "PHOTOGRAPH_OF_PROPRIETOR": "propPhoto",
  "PAN_CARD_OF_PROPRIETOR": "panProp",
  "AADHAR_CARD_OF_PROPRIETOR": "aadharPhoto",
  "CANCELLED_CHEQUE_OF_PROPRIETOR": "bankDoc",
  "ELECTRICITY_BILL_OF_PROPRIETOR": "propBill",
  "RENT_AGREEMENT_OF_FIRM": "rentDoc"
};

function FieldGroupUpload({ labelName, labelText, item, itemKey, handleFileUpload }) {
  return (
    <div className="form-group">
      <label htmlFor={labelName}>{labelText}</label>
      <br />
      {item && <a className="pull-left" style={{ marginRight: "10px" }} target="_blank" href={item}>View Current</a>}
      <input
        label="upload file"
        type="file"
        name={labelName}
        onChange={(e) => handleFileUpload(e, itemKey)}
      />
    </div >
  );
}

function FieldGroup({ labelName, labelText, handleChangeCust, item }) {
  return (
    <div className="form-group">
      <label htmlFor={labelName}>{labelText}</label>
      <input
        type="text"
        name={labelName}
        value={item}
        className="form-control"
        onChange={handleChangeCust}></input>
    </div>
  );
}

class CustomerManagement extends Component {

  constructor(props) {
    super(props);

    this.state = {
      customer: {
        name: "",
        phone: "",
        password: ""
      },
      submitted: false,
      modalIsOpen: false,
      editModalIsOpen: false,
      file: null,
      currentCustomer: {
        name: "",
        phone: "",
        propPhoto: "",
        panProp: "",
        aadharPhoto: "",
        bankDoc: "",
        propBill: "",
        rentDoc: "",
        firmName: "",
        businessNature: "",
        commoditiesName: "",
        propPhone: "",
        propEmail: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.submitFile = this.submitFile.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(employeeActions.getAllCustomers());
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { customer } = this.state;
    this.setState({
      customer: {
        ...customer,
        [name]: value
      }
    });
  }
  handleChangeCust(event) {
    const { name, value } = event.target;
    const { currentCustomer } = this.state;
    this.setState({
      currentCustomer: {
        ...currentCustomer,
        [name]: value
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { customer } = this.state;
    if (customer.name && customer.phone && customer.password) {
      this.props.dispatch(employeeActions.createCustomer(customer));
    }
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  openEditModal(event, cust) {
    this.setState({ editModalIsOpen: true });
    this.setState({
      currentCustomer: {
        ...this.state.currentCustomer,
        name: cust.name,
        phone: cust.phone,
        propPhoto: cust.propPhoto,
        panProp: cust.panProp,
        aadharPhoto: cust.aadharPhoto,
        bankDoc: cust.bankDoc,
        propBill: cust.propBill,
        rentDoc: cust.rentDoc,
        firmName: cust.firmName,
        businessNature: cust.businessNature,
        commoditiesName: cust.commoditiesName,
        propPhone: cust.propPhone,
        propEmail: cust.propEmail
      }
    });


  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  closeEditModal() {
    this.setState({ editModalIsOpen: false });
  }

  handleFileUpload(event, prefix) {
    const { name, value } = event.target;
    this.setState({ file: event.target.files });
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("customerName", this.state.currentCustomer.name);
    formData.append("customerPhone", this.state.currentCustomer.phone);
    formData.append("filePrefix", prefix);
    const self = this;
    this.props.dispatch(employeeActions.uploadFile(formData, function (data) {
      const { uploadData } = data;
      let currentCustomer = Object.assign({}, self.state.currentCustomer);
      currentCustomer[FILETYPE[uploadData.filePrefix]] = uploadData.Location;
      self.setState({ currentCustomer });
    }));
  }

  submitFile(event) {
    event.preventDefault();
    this.props.dispatch(employeeActions.updateCustomerDetails(this.state.currentCustomer))
  }

  render() {
    const { allCustomer, uploadData } = this.props;
    const { customer, submitted, currentCustomer } = this.state;

    return (
      <div>
        {allCustomer &&
          allCustomer.length && (
            <Table responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {allCustomer.map(emp => (
                  <tr key={emp.phone}>
                    <td>{emp.name}</td>
                    <td>{emp.phone}</td>
                    <td>
                      <Button bsStyle="primary" onClick={(e) => this.openEditModal(event, emp)}>Edit Customer Info</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        <Button bsStyle="primary" onClick={this.openModal}>Create New Customer</Button>
        <Modal
          show={this.state.modalIsOpen}
          onHide={this.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form name="form" onSubmit={this.handleSubmit}>
              <div className={"form-group" + (submitted ? " has-error" : "")}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={customer.name}
                  onChange={this.handleChange}
                />
                {submitted &&
                  !customer.name && (
                    <div className="help-block">Name is required</div>
                  )}
              </div>
              <div
                className={
                  "form-group" +
                  (submitted && !customer.phone ? " has-error" : "")
                }
              >
                <label htmlFor="phone">Phone</label>
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  value={customer.phone}
                  onChange={this.handleChange}
                />
                {submitted &&
                  !customer.phone && (
                    <div className="help-block">Phone is required</div>
                  )}
              </div>
              <div
                className={
                  "form-group" +
                  (submitted && !customer.passworclosed ? " has-error" : "")
                }
              >
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={customer.password}
                  onChange={this.handleChange}
                />
                {submitted &&
                  !customer.password && (
                    <div className="help-block">Password is required</div>
                  )}
              </div>
              <Modal.Footer>
                <Button onClick={this.closeModal}>Close</Button>
                <Button bsStyle="primary" onClick={this.handleSubmit}>Save changes</Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
        <Modal
          show={this.state.editModalIsOpen}
          onHide={this.closeEditModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>View/Edit Customer Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form name="form" onSubmit={this.submitFile}>
              <FieldGroup
                labelName="firmName"
                labelText="Name of firm"
                handleChangeCust={this.handleChangeCust}
                item={currentCustomer.firmName}
              />
              <div className="form-group">
                <label htmlFor="firmName">Name of firm</label>
                <input
                  type="text"
                  name="firmName"
                  value={currentCustomer.firmName}
                  className="form-control"
                  onChange={this.handleChangeCust}></input>
              </div>
              <FieldGroupUpload
                labelText="Photograph of Proprietor"
                labelName="propPhoto"
                item={currentCustomer.propPhoto}
                itemKey="PHOTOGRAPH_OF_PROPRIETOR"
                handleFileUpload={this.handleFileUpload}
              />
              <FieldGroupUpload
                labelText="Pan Card of Proprietor"
                labelName="panProp"
                item={currentCustomer.panProp}
                itemKey="PAN_CARD_OF_PROPRIETOR"
                handleFileUpload={this.handleFileUpload}
              />
              <FieldGroupUpload
                labelText="Aadhar card of Proprietor"
                labelName="aadharPhoto"
                item={currentCustomer.aadharPhoto}
                itemKey="AADHAR_CARD_OF_PROPRIETOR"
                handleFileUpload={this.handleFileUpload}
              />
              <FieldGroupUpload
                labelText="Cancelled Cheque / Bank Passbook of Proprietor"
                labelName="bankDoc"
                item={currentCustomer.bankDoc}
                itemKey="CANCELLED_CHEQUE_OF_PROPRIETOR"
                handleFileUpload={this.handleFileUpload}
              />
              <FieldGroupUpload
                labelText="Rent Agreement of firm"
                labelName="rentDoc"
                item={currentCustomer.rentDoc}
                itemKey="RENT_AGREEMENT_OF_FIRM"
                handleFileUpload={this.handleFileUpload}
              />
              <FieldGroup
                labelName="firmName"
                labelText="Nature of business (Trading/Manufacturing/Service)"
                handleChangeCust={this.handleChangeCust}
                item={currentCustomer.businessNature}
              />
              <FieldGroup
                labelName="commoditiesName"
                labelText="Name of comodities/items"
                handleChangeCust={this.handleChangeCust}
                item={currentCustomer.commoditiesName}
              />
              <FieldGroup
                labelName="propPhone"
                labelText="Mobile no. of proprietor"
                handleChangeCust={this.handleChangeCust}
                item={currentCustomer.propPhone}
              />
              <FieldGroup
                labelName="propPhone"
                labelText="Email address of proprietor"
                handleChangeCust={this.handleChangeCust}
                item={currentCustomer.propPhone}
              />
              <Modal.Footer>
                <Button onClick={this.closeEditModal}>Close</Button>
                <Button bsStyle="primary" onClick={this.submitFile}>Save changes</Button>
              </Modal.Footer>
            </form>
          </Modal.Body>

        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { allCustomer, uploadData } = state.employee;
  return {
    allCustomer,
    uploadData
  };
}

const connectedCustomerManagement = connect(mapStateToProps)(CustomerManagement);
export { connectedCustomerManagement as CustomerManagement };