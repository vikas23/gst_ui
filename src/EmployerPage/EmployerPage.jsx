import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { EmployeeManagement } from "./employeeMangement";
import EmployerLicense from "./employerLicense";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import { userActions } from "../_actions";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <EmployeeManagement />
  },
  {
    path: "/license",
    main: () => <EmployerLicense />
  }
];
class EmployerPage extends React.Component {
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
              <div >
                <ul style={{ listStyleType: "node", padding: 0 }} className="nav">
                  <li className="nav-item">
                    <Link to="/">Employee Management</Link>
                  </li>
                  <li>
                    <Link to="/license">License</Link>
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
          {/* <div style={{ display: "flex" }}>

          </div> */}
        </Router>
      </div >
    );
  }
}

function mapStateToProps(state) {
  const { allEmployees } = state.employer;
  return {
    allEmployees
  };
}

const connectedEmployerPage = connect(mapStateToProps)(EmployerPage);
export { connectedEmployerPage as EmployerPage };
