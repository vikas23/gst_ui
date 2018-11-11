import {
  customerConstants
} from '../_constants';
import {
  customerService
} from '../_services';
import {
  alertActions
} from './';

export const customerActions = {
  uploadBills,
  updateBills,
  checkGstStatus,
  updateBillData,
};

function uploadBills(data, callback) {
  return dispatch => {
    dispatch(request(data));

    customerService.uploadBills(data)
      .then(
        data => {
          dispatch(success(data));
          callback();
          dispatch(alertActions.success('Bill Upload Successfully'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(data) {
    return {
      type: customerConstants.UPLOADBILL_REQUEST,
      data
    }
  }

  function success(data) {
    return {
      type: customerConstants.UPLOADBILL_SUCCESS,
      data
    }
  }

  function failure(error) {
    return {
      type: customerConstants.UPLOADBILL_FAILURE,
      error
    }
  }
}

function updateBills(data, callback) {
  return dispatch => {
    dispatch(request(data));

    customerService.updateBills(data)
      .then(
        data => {
          dispatch(success(data))
          dispatch(alertActions.success('Bill updated successfully'));
          callback(data)
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(data) {
    return {
      type: customerConstants.UPDATEBILL_REQUEST,
      data
    }
  }

  function success(data) {
    return {
      type: customerConstants.UPDATEBILL_SUCCESS,
      data
    }
  }

  function failure() {
    return {
      type: customerConstants.UPDATEBILL_FAILURE,
      data
    }
  }
}

function checkGstStatus() {
  return dispatch => {
    dispatch(request());

    customerService.checkGstStatus()
      .then(
        data => dispatch(success(data)),
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request() {
    return {
      type: customerConstants.CHECKGST_REQUEST
    }
  }

  function success(data) {
    return {
      type: customerConstants.CHECKGST_SUCCESS,
      data
    }
  }

  function failure(error) {
    return {
      type: customerConstants.CHECKGST_FAILURE,
      error
    }
  }
}

function updateBillData(data) {
  return dispatch => {
    dispatch(request());

    customerService.updateBillData(data)
      .then(
        data => dispatch(success(data)),
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request() {
    return {
      type: customerConstants.UPDATEBILLDATA_REQUEST
    }
  }

  function success(data) {
    return {
      type: customerConstants.UPDATEBILLDATA_SUCCESS,
      data
    }
  }

  function failure(error) {
    return {
      type: customerConstants.UPDATEBILLDATA_FAILURE,
      error
    }
  }
}