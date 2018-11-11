import React, { Component } from 'react';
import { Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "./employee.css";

import { employeeActions, customerActions } from "../_actions";

class UpdateBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCustBills: {},
      billData: {},
      customerPhone: "",
      photoIndex: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.onCustomerPhoneSubmit = this.onCustomerPhoneSubmit.bind(this);
    this.openImageViewer = this.openImageViewer.bind(this);
  }

  onCustomerPhoneSubmit() {
    const { customerPhone } = this.state;
    this.props.dispatch(employeeActions.getCustomerBillData({ phone: customerPhone }));
  }

  openImageViewer(currentBills) {
    this.setState({
      isOpen: true,
      currentCustBills: currentBills,
      photoIndex: 0,
    })
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      customerPhone: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { customerPhone } = this.state;
    if (customerPhone) {
      this.props.dispatch(employeeActions.getCustomerBillData(customerPhone));
    }
  }

  submitCustBillData(event, bill) {
    event.preventDefault();
    const payload = {
      billData: bill
    };
    this.props.dispatch(customerActions.updateBillData(payload));
  }

  render() {
    const { billData } = this.props;
    const { customerPhone, isOpen, currentCustBills, photoIndex } = this.state;
    return (
      <div>
        <form name="uploadBillForm">
          <div className="form-group">
            <label htmlFor="custPhone" style={{ float: "left", textAlign: "center", lineHeight: "250%", marginRight: "15px" }}>Enter Customer Phone: </label>
            <input
              type="text"
              value={customerPhone}
              onChange={this.handleChange}
              className="form-control pull-left"
              style={{ width: "15%", marginRight: "15px" }}
            />
            <Button bsStyle="primary" style={{ marginRight: "10px" }} onClick={this.onCustomerPhoneSubmit}>Get Customer Bills</Button>
          </div>
        </form>
        <div>
          <Table responsive>
            <thead>
              <tr>
                <th>Bill Date</th>
                <th>Bill Type</th>
                <th>View Bills</th>
                <th>Total Bill</th>
                <th>Total GST</th>
              </tr>
            </thead>
            <tbody>
              {!!billData &&
                !!billData.length &&
                billData.map(bill => (
                  <tr key={bill._id}>
                    <td className="col-md-2">
                      <div className="form-group">
                        <label >{moment(bill.billDate).local().format('YYYY-MM-DD')}</label>
                      </div>
                    </td>
                    <td className="col-md-2">
                      <div className="form-group">
                        <label>{bill.billType}</label>
                      </div>
                    </td>
                    <td className="col-md-2">
                      <div className="form-group">
                        <Button bsStyle="link" onClick={(e) => this.openImageViewer(bill.billLocation)}>{(bill.billLocation && bill.billLocation.length || 0)} Available</Button>
                      </div>
                    </td>
                    <td className="col-md-2">
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control"
                          style={{ width: "50%" }}
                          value={bill.totalBill}
                          onChange={(e) => bill.totalBill = e.target.value} />
                      </div>
                    </td>
                    <td className="col-md-2">
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control"
                          style={{ width: "50%" }}
                          value={bill.totalGst}
                          onChange={(e) => {
                            bill.totalGst = e.target.value
                          }} />
                      </div>
                    </td>
                    <td className="col-md-2">
                      <div className="form-group">
                        <Button bsStyle="primary" onClick={(e) => this.submitCustBillData(e, bill)}>Submit</Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={currentCustBills[photoIndex]}
            nextSrc={currentCustBills[(photoIndex + 1) % currentCustBills.length]}
            prevSrc={currentCustBills[(photoIndex + currentCustBills.length - 1) % currentCustBills.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() => {
              if (photoIndex === 0) return false;
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
            }
            }
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

const connectedUpdateBill = connect(mapStateToProps)(UpdateBill);
export { connectedUpdateBill as UpdateBill };