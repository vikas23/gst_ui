import {
  employerConstants
} from '../_constants';
import {
  employerService
} from '../_services';
import {
  alertActions
} from './';

export const employerActions = {
  registerEmployee,
  getAllEmployees,
  setLicense
};

function registerEmployee(data) {
  return dispatch => {
    dispatch(request(data));

    employerService.registerEmployee(data)
      .then(
        data => {
          dispatch(success());
          dispatch(alertActions.success('Employee Successfully Created'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      )
  };

  function request(data) {
    return {
      type: employerConstants.CREATEEMP_REQUEST,
      data
    }
  }

  function success(data) {
    return {
      type: employerConstants.CREATEEMP_SUCCESS,
      data
    }
  }

  function failure(error) {
    return {
      type: employerConstants.CREATEEMP_FAILURE,
      error
    }
  }
}

function getAllEmployees() {
  return dispatch => {
    dispatch(request());

    employerService.getAllEmployees()
      .then(
        data => dispatch(success(data)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() {
    return {
      type: employerConstants.GETALLEMP_REQUEST
    }
  }

  function success(data) {
    return {
      type: employerConstants.GETALLEMP_SUCCESS,
      data
    }
  }

  function failure(error) {
    return {
      type: employerConstants.GETALLEMP_FAILURE,
      error
    }
  }
}

function setLicense() {
  return dispatch => {

    dispatch(request());

    employerService.setLicense()
      .then(
        data => dispatch(success(data)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() {
    return {
      type: employerConstants.SETLICENSE_REQUEST
    }
  }

  function success(data) {
    return {
      type: employerConstants.SETLICENSE_SUCCESS,
      data
    }
  }

  function failure(error) {
    return {
      type: employerConstants.SETLICENSE_FAILURE,
      error
    }
  }
}