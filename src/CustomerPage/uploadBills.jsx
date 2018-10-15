import React, { Component } from "react";
import { Table, Button, Modal, FormGroup, Radio } from "react-bootstrap";
import { connect } from "react-redux";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import "../../node_modules/react-datepicker/dist/react-datepicker-cssmodules.css";
import { customerActions, employeeActions } from "../_actions";

const user = JSON.parse(localStorage.getItem("user"));

const BILLTYPE = {
  PURCHASE: 'purchase',
  SALES: 'sales'
}

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
        required multiple />
    </div >
  );
}

class UploadBills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cust: {
        billDate: moment.utc(),
        billType: BILLTYPE.PURCHASE
      },
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  handleSubmit(event) {
    event.preventDefault();

    const { cust } = this.state;
    const payload = {
      billDate: cust.billDate.valueOf(),
      billType: cust.billType,
      billLocation: cust.billLocaltion
    }
    if (cust) {
      console.log(payload);
      this.props.dispatch(customerActions.uploadBills(payload));
    }
  }

  handleChangeDate(billDate) {
    this.setState({
      cust: {
        ...this.state.cust,
        billDate
      }
    })
  }

  handleFileUpload(event, prefix) {
    const { name, value } = event.target;
    this.setState({ file: event.target.files });
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("name", user.name);
    formData.append("phone", user.phone);
    formData.append("filePrefix", prefix);
    const self = this;
    const { cust } = this.state;
    this.props.dispatch(employeeActions.uploadFile(formData, function (data) {
      const { uploadData } = data;
      console.log(uploadData)
      const billLocaltion = uploadData.Location;
      self.setState({
        cust: {
          ...cust,
          billLocaltion
        }
      });
    }));
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  render() {
    const { billData } = this.props;
    let bills;
    if (billData) { bills = billData.bills };
    const { cust } = this.state;
    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>Bill Date</th>
              <th>Bill Type</th>
              <th>Total Bill</th>
              <th>View Bills</th>
            </tr>
          </thead>
          <tbody>
            {bills && Object.keys(bills).map(bDate => (
              <tr key={bDate}>
                <td>
                  <div className="form-group">
                    <label >moment(bDate)</label>
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <input
                      type="text"
                      value={bills[bDate].totalBill}
                    />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <a href="">View Bills</a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button bsStyle="primary" style={{ marginTop: "30px" }} onClick={this.openModal}>Add Bills</Button>
        <Modal
          show={this.state.modalIsOpen}
          onHide={this.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Bill</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form name="form" onSubmit={this.handleSubmit}>
              <div className="form-group" style={{ marginBottom: "5px" }}>
                <label >Bill Date</label>
                <br />
                <DatePicker
                  selected={cust.billDate}
                  onChange={this.handleChangeDate}
                  className="form-control"
                />
              </div>
              <FormGroup>
                <label style={{ marginRight: "10px" }}>Bill Type</label>
                <Radio name="radioGroup" onChange={(e) => cust.billType = BILLTYPE.PURCHASE} checked inline>Purchase Bill</Radio>{' '}
                <Radio name="radioGroup" onChange={(e) => cust.billType = BILLTYPE.SALES} inline>Sales Bill</Radio>
              </FormGroup>
              <FieldGroupUpload
                labelText="Customer Bills"
                labelName="custBills"
                handleFileUpload={this.handleFileUpload}
                item={cust.bill}
              />
              <Modal.Footer>
                <Button onClick={this.closeEditModal}>Close</Button>
                <Button bsStyle="primary" onClick={this.handleSubmit}>Save changes</Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { billData } = state.customer;
  return {
    billData
  };
}

const connectedUploadBills = connect(mapStateToProps)(UploadBills);
export { connectedUploadBills as UploadBills };