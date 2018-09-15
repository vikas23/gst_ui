import {
  employeeConstants
} from '../_constants';
import {
  employeeService
} from '../_services';
import {
  alertActions
} from './';

export const employeeActions = {
  createCustomer,
  uploadFile,
  getAllCustomers,
};

function createCustomer(data) {
  return dispatch => {
    dispatch(request(data));

    employeeService.createCustomer(data)
      .then(
        data => {
          dispatch(success(data));
          dispatch(alertActions.success('Customer Profile Successfully Created'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(data) {
    return {
      type: employeeConstants.CREATECUST_REQUEST,
      data
    }
  }

  function success(data) {
    return {
      type: employeeConstants.CREATECUST_SUCCESS,
      data
    }
  }

  function failure(error) {
    return {
      type: employeeConstants.CREATECUST_FAILURE,
      error
    }
  }
}

function uploadFile(data) {
  return dispatch => {
    dispatch(request(data));

    employeeService.uploadFile(data)
      .then(
        data => {
          dispatch(success(data))
          dispatch(alertActions.success('Upload file successful'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(data) {
    return {
      type: employeeConstants.UPLOADFILE_REQUEST,
      data
    }
  }

  function success(data) {
    return {
      type: employeeConstants.UPLOADFILE_SUCCESS,
      data
    }
  }

  function failure() {
    return {
      type: employeeConstants.UPLOADFILE_FAILURE,
      data
    }
  }
}

function getAllCustomers() {
  return dispatch => {
    dispatch(request());

    employeeService.getAllCustomers()
      .then(
        data => dispatch(success(data)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() {
    return {
      type: employeeConstants.GETALLCUST_REQUEST
    }
  }

  function success(data) {
    return {
      type: employeeConstants.GETALLCUST_SUCCESS,
      data
    }
  }

  function failure(error) {
    return {
      type: employeeConstants.GETALLCUST_FAILURE,
      error
    }
  }
}