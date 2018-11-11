import React, { Component } from 'react';
import { connect } from "react-redux";
import { customerActions, employeeActions } from "../_actions";
import moment from 'moment';
import { Table } from "react-bootstrap";


let user = {};

class GstStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billTableData: []
    };
  }

  componentDidMount() {
    user = JSON.parse(localStorage.getItem("user"));
    const billTableData = [];
    this.props.dispatch(employeeActions.getCustomerBillData({ phone: user.phone }, () => {
      const { billData } = this.props;
      const monthYearObj = {};
      _.each(billData, (bill) => {
        const monthYear = moment(bill.billDate).local().format('YYYY-MM');
        if (!monthYearObj[monthYear]) {
          monthYearObj[monthYear] = {
            totalGst: 0,
            totalPBill: 0,
            totalSBill: 0
          };
        }
        if (bill.billType === "sales") {
          bill.totalBill && (monthYearObj[monthYear].totalSBill += +bill.totalBill);
        } else {
          bill.totalBill && (monthYearObj[monthYear].totalPBill += +bill.totalBill);
        }
        bill.totalGst && (monthYearObj[monthYear].totalGst += +bill.totalGst);
      });
      _.each(monthYearObj, (val, key) => {
        let obj = {
          month: key,
          totalSBill: val.totalSBill,
          totalPBill: val.totalPBill,
          totalGst: val.totalGst
        };
        billTableData.push(obj);
      })
      this.setState({ billTableData })
    }));
  }

  render() {
    const { billTableData } = this.state;
    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>Month</th>
              <th>Total Sales Bill</th>
              <th>Total Purchase Bill</th>
              <th>Total GST</th>
            </tr>
          </thead>
          <tbody>
            {!!billTableData
              && !!billTableData.length
              && billTableData.map(bill => (
                <tr key={bill.month}>
                  <td className="col-md-2">
                    <div className="form-group">
                      <label >{bill.month}</label>
                    </div>
                  </td>
                  <td className="col-md-2">
                    <div className="form-group">
                      <label>Rs. {bill.totalSBill}</label>
                    </div>
                  </td>
                  <td className="col-md-2">
                    <div className="form-group">
                      <label>Rs. {bill.totalPBill}</label>
                    </div>
                  </td>
                  <td className="col-md-2">
                    <div className="form-group">
                      <label>Rs. {bill.totalGst}</label>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
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

const connectedGstStatus = connect(mapStateToProps)(GstStatus);
export { connectedGstStatus as GstStatus };
