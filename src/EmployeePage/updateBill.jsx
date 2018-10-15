import React, { Component } from 'react';
import { Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import moment from 'moment';
import "../../node_modules/react-datepicker/dist/react-datepicker-cssmodules.css";
import "./employee.css";

import { employeeActions } from "../_actions";

class UpdateBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCustBills: {},
      customerPhone: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.onCustomerPhoneSubmit = this.onCustomerPhoneSubmit.bind(this);
  }

  onCustomerPhoneSubmit() {
    const { customerPhone } = this.state;
    this.props.dispatch(employeeActions.getCustomerBillData({ phone: customerPhone }));
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

  render() {
    const { billData } = this.props;
    let bills;
    // if (billData) { bills = billData.bills };
    const { customerPhone } = this.state;
    return (
      <div>
        <form name="uploadBillForm" onSubmit={this.onCustomerPhoneSubmit}>
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
              </tr>
            </thead>
            <tbody>
              {billData &&
                billData.length &&
                billData.map(bill => (
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
                        <a target="_blank" href={bill.billLocation}>View Bill</a>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
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