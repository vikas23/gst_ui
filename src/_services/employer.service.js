import config from 'config';
import {
  authHeader
} from '../_helpers';


export const employerService = {
  registerEmployee,
  getAllEmployees
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

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    console.log(data);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}