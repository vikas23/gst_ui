import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { CustomerManagement } from "./customerManagement";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { userActions } from "../_actions";

const routes = [
  {
    path: "/customerManagement",
    exact: true,
    main: () => <CustomerManagement />
  }
];

class EmployeePage extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.dispatch(userActions.logout());
  }

  render() {
    return (
      <div>
        <Navbar>
          <Nav pullRight>
            <NavItem eventKey={1} href="#" onClick={this.logout}>
              Logout
            </NavItem>
          </Nav>
        </Navbar>
        <Router>
          <div className="sidebar" style={{ listStyleType: "node", padding: 0 }}>
            <nav className="sidebar-nav" style={{ display: "flex" }}>
              <div>
                <ul style={{ listStyleType: "node", padding: 0 }} className="nav">
                  <li className="nav-item">
                    <Link to="/customerManagement" >Customer Management</Link>
                  </li>
                </ul>
              </div>
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
            </nav>
          </div>
        </Router>
      </div>
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
