import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { CustomerManagement } from "./customerManagement";

import { employeeActions } from '../_actions';
const routes = [
  {
    path: "/customerManagement",
    exact: true,
    main: () => <CustomerManagement />
  }
];

class EmployeePage extends Component {

  render() {
    return (
      <Router>
        <div style={{ display: "flex" }}>
          <ul style={{ listStyleType: "node", padding: 0 }}>
            <li>
              <Link to="/customerManagement" >Customer Management</Link>
            </li>
          </ul>
          <div style={{ flex: 1 }}>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { allCustomers } = state.employee;
  return {
    allCustomers
  };
}

const connectedEmployeePage = connect(mapStateToProps)(EmployeePage);
export { connectedEmployeePage as EmployeePage };
