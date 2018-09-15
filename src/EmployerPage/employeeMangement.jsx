import React from "react";
import Modal from "react-modal";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

import { employerActions } from "../_actions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%"
  }
};

Modal.setAppElement("#app");

class EmployeeManagement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: {
        name: "",
        phone: "",
        password: ""
      },
      submitted: false,
      modalIsOpen: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(employerActions.getAllEmployees());
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { employee } = this.state;
    this.setState({
      employee: {
        ...employee,
        [name]: value
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { employee } = this.state;
    if (employee.name && employee.phone && employee.password) {
      this.props.dispatch(employerActions.registerEmployee(employee));
    }
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#000";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  render() {
    const { employeeRegistering, allEmployees } = this.props;
    const { employee, submitted } = this.state;

    // console.log(allEmployees);
    return (
      <div>
        {allEmployees &&
          allEmployees.length && (
            <Table responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {allEmployees.map(emp => (
                  <tr key={emp.phone}>
                    <td>{emp.name}</td>
                    <td>{emp.phone}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Create Employee</h2>
          <button className="m-b-1  5" onClick={this.closeModal}>
            close
          </button>
          <form name="form" onSubmit={this.handleSubmit}>
            <div className={"form-group" + (submitted ? " has-error" : "")}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={employee.name}
                onChange={this.handleChange}
              />
              {submitted &&
                !employee.name && (
                  <div className="help-block">Name is required</div>
                )}
            </div>
            <div
              className={
                "form-group" +
                (submitted && !employee.phone ? " has-error" : "")
              }
            >
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                className="form-control"
                name="phone"
                value={employee.phone}
                onChange={this.handleChange}
              />
              {submitted &&
                !employee.phone && (
                  <div className="help-block">Phone is required</div>
                )}
            </div>
            <div
              className={
                "form-group" +
                (submitted && !employee.password ? " has-error" : "")
              }
            >
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={employee.password}
                onChange={this.handleChange}
              />
              {submitted &&
                !employee.password && (
                  <div className="help-block">Password is required</div>
                )}
            </div>
            <div className="form-group">
              <button className="btn btn-primary">Create Employee</button>
              {employeeRegistering && (
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              )}
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { allEmployees } = state.employer;
  return {
    allEmployees
  };
}

const connectedEmployeeManagement = connect(mapStateToProps)(EmployeeManagement);
export { connectedEmployeeManagement as EmployeeManagement };
