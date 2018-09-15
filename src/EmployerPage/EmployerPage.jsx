import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { EmployeeManagement } from "./employeeMangement";

import { employerActions } from '../_actions';
// import EmployerLicense from "./employerLicense";
const routes = [
  {
    path: "/",
    exact: true,
    main: () => <EmployeeManagement />
  }
  // ,
  // {
  //   path: "/license",
  //   main: () => <EmployerLicense />
  // }
];
class EmployerPage extends React.Component {

  // componentDidMount() {
  //   // this.props.dispacth(employerActions.getAllEmployees());
  //   // userService.getAllEmployees().then(response => {
  //   //   response.text().then(text => {
  //   //     const data = text && JSON.parse(text);
  //   //     this.setState({ allEmployees: data.allEmployees });
  //   //   });
  //   // });
  // }

  render() {
    return (
      <Router>
        <div style={{ display: "flex" }}>
          <ul style={{ listStyleType: "node", padding: 0 }}>
            <li>
              <Link to="/">Employee Management</Link>
            </li>
            <li>
              <Link to="/license">License</Link>
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
  const { allEmployees } = state.employer;
  return {
    allEmployees
  };
}

const connectedEmployerPage = connect(mapStateToProps)(EmployerPage);
export { connectedEmployerPage as EmployerPage };
