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
  getCustomerBillData,
  updateCustomerBillData,
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

function getCustomerBillData(customerData) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/employee/getCustomerBillData/${customerData.phone}`, requestOptions).then(handleResponse);
}

function updateCustomerBillData(customerData) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(customerData)
  };

  return fetch(`${config.apiUrl}/employee/updateCustomerBillData`, requestOptions).then(handleResponse);
}