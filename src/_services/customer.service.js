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

export const customerService = {
  uploadBills,
  updateBills,
  checkGstStatus,
  updateBillData,
}

function uploadBills(billData) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(billData)
  };
  return fetch(`${config.apiUrl}/employee/updateCustomerBillData`, requestOptions).then(handleResponse);
}

function updateBills(formData) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(formData)
  };

  return fetch(`${config.apiUrl}/customer/updateBill`, requestOptions).then(handleResponse);
}

function checkGstStatus() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/customer/checkGstStatus`, requestOptions).then(handleResponse);
}

function updateBillData(billData) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(billData)
  };

  return fetch(`${config.apiUrl}/employee/updateCustomerBillData`, requestOptions).then(handleResponse);
}