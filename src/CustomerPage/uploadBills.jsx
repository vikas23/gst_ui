import React, { Component } from "react";
import { Table, Button, Modal, FormGroup, Radio, Carousel } from "react-bootstrap";
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
      modalIsOpen: false,
      carouselModalIsOpen: false,
      billLocaltion: []
    };

    this.openModal = this.openModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleCarousel = this.handleCarousel.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(employeeActions.getCustomerBillData({ phone: user.phone }));
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
    }));
  }

  handleCarousel(e, billLocaltion) {
    console.log("Billl Localtion");
    console.log(billLocaltion);
    this.setState({ carouselModalIsOpen: true });
    this.setState({ billLocaltion });
  };

  closeModal() {
    this.setState({ modalIsOpen: false });
    this.setState({ carouselModalIsOpen: false });
  }

  render() {
    const { billData } = this.props;
    const { cust, billLocaltion } = this.state;
    const that = this;
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
            {billData
              && billData.length
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
                      <Button bsStyle="link" onClick={(e) => this.handleCarousel(e, bill.billLocation)}>View Bills</Button>
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
        {/* <Modal */}
        {/* onHide={this.closeModal} */}
        >
          {/* <Modal.Body> */}
        <Carousel
          show={this.state.carouselModalIsOpen}
        >
          {[1, 2, 3].map((data) => {
            <Carousel.Item>
              <img width={900} height={500} alt="900x500" src="https://emp1-9886937016.s3.amazonaws.com/Cust1-9886937018/undefined-1540059526681-Modified_Type.png" />
            </Carousel.Item>
          })}

          {/* {billLocaltion.map((imgLocal) => {

          })} */}
        </Carousel>
        {/* </Modal.Body> */}
        {/* </Modal> */}
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