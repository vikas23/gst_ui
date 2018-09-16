import React, { Component } from "react";
import Modal from "react-modal";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

import { employeeActions } from "../_actions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%"
  }
};

const FILETYPE = {
  "PHOTOGRAPH_OF_PROPRIETOR": "propPhoto",
  "PAN_CARD_OF_PROPRIETOR": "panProp",
  "AADHAR_CARD_OF_PROPRIETOR": "aadharPhoto",
  "CANCELLED_CHEQUE_OF_PROPRIETOR": "bankDoc",
  "ELECTRICITY_BILL_OF_PROPRIETOR": "propBill",
  "RENT_AGREEMENT_OF_FIRM": "rentDoc"
};
let currentCust = {};
Modal.setAppElement("#app");

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
    this.afterOpenModal = this.afterOpenModal.bind(this);
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
    currentCust = cust;
    this.setState({
      currentCustomer: {
        ...this.state.currentCustomer,
        name: cust.name,
        phone: cust.phone
      }
    });


  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#000";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  closeEditModal() {
    this.setState({ editModalIsOpen: false });
  }

  handleFileUpload(event, prefix) {
    this.setState({ file: event.target.files });
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("customerName", currentCust.name);
    formData.append("customerPhone", currentCust.phone);
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
                      <button onClick={(e) => this.openEditModal(event, emp)}>Edit Customer Info</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Create Customer</h2>
          <button className="m-b-1  5" onClick={this.closeModal}>
            close
          </button>
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
            <div className="form-group">
              <button className="btn btn-primary">Create Employee</button>
              {
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
            </div>
          </form>
        </Modal>
        <Modal
          isOpen={this.state.editModalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>
            Edit Customer Details
          </h2>
          <button className="btn-link pull-right" onClick={this.closeModal}>
            close
          </button>
          <form name="form" onSubmit={this.submitFile}>
            NAME OF FIRM:
            <input type="text" name="firmName" className="form-control"></input>
            <br />
            PHOTOGRAPH OF PROPRIETOR:
            <input
              label="upload file"
              type="file"
              name="propPhoto"
              className="formControl"
              onChange={(e) => this.handleFileUpload(e, "PHOTOGRAPH_OF_PROPRIETOR")}
            />
            <br />
            PAN CARD OF PROPRIETOR:
            <input
              label="upload file"
              type="file"
              name="panProp"
              className="formControl"
              onChange={(e) => this.handleFileUpload(e, "PAN_CARD_OF_PROPRIETOR")}
            />
            <br />
            AADHAR CARD OF PROPRIETOR:
            <input
              label="upload file"
              type="file"
              name="aadharPhoto"
              className="formControl"
              onChange={(e) => this.handleFileUpload(e, "AADHAR_CARD_OF_PROPRIETOR")}
            />
            <br />
            CANCELLED CHEQUE / BANK PASS BOOK OF PROPRIETOR:
            <input
              label="upload file"
              type="file"
              name="bankDoc"
              className="formControl"
              onChange={(e) => this.handleFileUpload(e, "CANCELLED_CHEQUE_OF_PROPRIETOR")}
            />
            <br />
            ELECTRICITY BILL / WATER BILL OF PROPRIETOR (IF OWNED PROPERTY)
            <input
              label="upload file"
              type="file"
              name="propBill"
              className="formControl"
              onChange={(e) => this.handleFileUpload(e, "ELECTRICITY_BILL_OF_PROPRIETOR")}
            />
            <br />
            RENT AGREEMENT OF FIRM (IF RENTED PROMISES)
            <input
              label="upload file"
              type="file"
              name="rentDoc"
              className="formControl"
              onChange={(e) => this.handleFileUpload(e, "RENT_AGREEMENT_OF_FIRM")}
            />
            NATURE OF BUSINESS (TRADING / MANUFACTURING / SERVICE)
            <br />
            <input type="text" name="businessNature" className="form-control"></input>
            <br />
            NAME OF COMMODITIES / ITEMS:
            <input type="text" name="commoditiesName" className="form-control"></input>
            <br />
            MOBILE NO. OF PROPRIETOR:
            <input type="number" name="propPhone" className="form-control"></input>
            <br />
            EMAIL ADDRESS OF PROPRIETOR:
            <input type="number" name="propEmail" className="form-control"></input>
            <br />
            <button className="formControl" type="submit">Send</button>
          </form>
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