import React, { Component } from "react";
import { Table, Button, Modal, FormGroup, Radio } from "react-bootstrap";
import { connect } from "react-redux";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Lightbox from 'react-image-lightbox';
import "../../node_modules/react-datepicker/dist/react-datepicker-cssmodules.css";
import { customerActions, employeeActions } from "../_actions";

let user = {};

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
      modalIsOpen: false,
      carouselModalIsOpen: false,
      billLocaltion: [],
      currentCustBills: {},
      photoIndex: 0
    };

    this.openModal = this.openModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.openImageViewer = this.openImageViewer.bind(this);
  }

  componentDidMount() {
    user = JSON.parse(localStorage.getItem("user"));
    this.props.dispatch(employeeActions.getCustomerBillData({ phone: user.phone }));
  }

  openImageViewer(currentBills) {
    this.setState({
      isOpen: true,
      currentCustBills: currentBills,
      photoIndex: 0,
    })
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
      this.props.dispatch(customerActions.uploadBills(payload, () => {
        this.props.dispatch(employeeActions.getCustomerBillData({ phone: user.phone }));
        this.closeModal();
      }));
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
    this.setState({ file: event.target.files });
    const formData = new FormData();
    event.target.files
    _.each(event.target.files, (file) => {
      formData.append("file", file);
    });
    formData.append("name", user.name);
    formData.append("phone", user.phone);
    formData.append("filePrefix", prefix);
    const self = this;
    const { cust } = this.state;
    this.props.dispatch(employeeActions.uploadFile(formData, function (data) {
      const { uploadData } = data;
      const billLocaltion = [];
      _.each(uploadData, (data) => {
        billLocaltion.push(data.Location);
      });
      self.setState({
        cust: {
          ...cust,
          billLocaltion
        }
      });
      self.setState({ isFileUploaded: true })
    }));
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
    this.setState({ carouselModalIsOpen: false });
    this.setState({ isFileUploaded: false });
  }

  render() {
    const { billData } = this.props;
    const { cust, isOpen, currentCustBills, photoIndex } = this.state;
    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>Bill Date</th>
              <th>Bill Type</th>
              <th>View Bills</th>
            </tr>
          </thead>
          <tbody>
            {!!billData
              && !!billData.length
              && billData.map(bill => (
                <tr key={bill._id}>
                  <td>
                    <div className="form-group">
                      <label >{moment(bill.billDate).local().format('YYYY-MM-DD')}</label>
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <label>{bill.billType}</label>
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <Button bsStyle="link" onClick={(e) => this.openImageViewer(bill.billLocation)}>{(bill.billLocation && bill.billLocation.length) || 0} Available</Button>
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
                <Button onClick={this.closeModal}>Close</Button>
                <Button bsStyle="primary" onClick={this.handleSubmit} disabled={!this.state.isFileUploaded}>Save changes</Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
        {isOpen && (
          <Lightbox
            mainSrc={currentCustBills[photoIndex]}
            nextSrc={currentCustBills[(photoIndex + 1) % currentCustBills.length]}
            prevSrc={currentCustBills[(photoIndex + currentCustBills.length - 1) % currentCustBills.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() => {
              if (!photoIndex) return false
              this.setState({
                photoIndex: (photoIndex + currentCustBills.length - 1) % currentCustBills.length,
              })
            }
            }
            onMoveNextRequest={() => {
              if (photoIndex === currentCustBills.length - 1) return false;
              this.setState({
                photoIndex: (photoIndex + 1) % currentCustBills.length,
              })
            }}
          />
        )}
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { billData } = state.employee;
  return {
    billData
  };
}

const connectedUploadBills = connect(mapStateToProps)(UploadBills);
export { connectedUploadBills as UploadBills };