import config from 'config';
import {
  authHeader
} from '../_helpers';
import {
  userService
} from './user.service';

const {
  handleResponse
} = userService;

export const employerService = {
  registerEmployee,
  getAllEmployees,
  setLicense
};

function registerEmployee(employee) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(employee)
  };
  return fetch(`${config.apiUrl}/employer/createEmployee`, requestOptions).then(handleResponse);
}

function getAllEmployees() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${config.apiUrl}/employer/getAllEmployees`, requestOptions).then(handleResponse);

}

function setLicense(license) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(license)
  };
  return fetch(`${config.apiUrl}/employer/set/license`, requestOptions).then(handleResponse);
}