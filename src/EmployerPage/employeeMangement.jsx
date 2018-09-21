import React from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { employerActions } from "../_actions";

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

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  render() {
    const { allEmployees } = this.props;
    const { employee, submitted } = this.state;

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
        <Button bsStyle="primary" onClick={this.openModal}>Create New Employee</Button>
        <Modal
          show={this.state.modalIsOpen}
          onHide={this.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
              <div className={"form-group" + (submitted && !employee.phone ? " has-error" : "")}>
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
              <div className={"form-group" + (submitted && !employee.password ? " has-error" : "")}>
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
              <Modal.Footer>
                <Button onClick={this.closeModal}>Close</Button>
                <Button bsStyle="primary" onClick={this.handleSubmit}>Save changes</Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
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
