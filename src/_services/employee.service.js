import config from 'config';
import {
  authHeader,
  authHeaderNoJson
} from '../_helpers';

import {
  userService
} from './user.service';

const {
  handleResponse
} = userService;

export const employeeService = {
  uploadFile,
  getAllCustomers,
  createCustomer,
  updateCustomerDetails,
}

function uploadFile(formData) {
  const requestOptions = {
    method: 'POST',
    headers: authHeaderNoJson(),
    body: formData
  };
  return fetch(`${config.apiUrl}/employee/uploadFile`, requestOptions).then(handleResponse);
}

function getAllCustomers() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${config.apiUrl}/employee/getAllCustomer`, requestOptions).then(handleResponse);
}


function createCustomer(customer) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(customer)
  };

  return fetch(`${config.apiUrl}/employee/createCustomer`, requestOptions).then(handleResponse);
}

function updateCustomerDetails(customerData) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(customerData)
  };

  return fetch(`${config.apiUrl}/employee/updateCustomer`, requestOptions).then(handleResponse);
}