  import {
    employeeConstants
  } from '../_constants';

  export function employee(state = {}, action) {
    switch (action.type) {
      case employeeConstants.UPLOADFILE_REQUEST:
        return {
          uploadingFile: true
        };
      case employeeConstants.UPLOADFILE_SUCCESS:
        return {
          uploadData: action.data.uploadData,
          success: true
        };
      case employeeConstants.UPLOADFILE_FAILURE:
        return {};
      case employeeConstants.GETALLCUST_REQUEST:
        return {
          gettingCust: true
        };
      case employeeConstants.GETALLCUST_SUCCESS:
        return {
          success: true,
          allCustomer: action.data.allCustomer
        };
      case employeeConstants.GETALLCUST_FAILURE:
        return {};
      case employeeConstants.CREATECUST_REQUEST:
        return {
          createCust: true
        };
      case employeeConstants.CREATECUST_SUCCESS:
        return {
          success: true,
          userId: action.data.userId
        };
      case employeeConstants.CREATECUST_FAILURE:
        return {};
      case employeeConstants.UPDATECUST_REQUEST:
        return {
          updatingCust: true
        }
      case employeeConstants.UPDATECUST_SUCCESS:
        return {
          success: true
        }
      case employeeConstants.UPDATECUST_FAILURE:
        return {}
      case employeeConstants.GETCUSTBILL_REQUEST:
        return {
          getCustBill: true
        }
      case employeeConstants.GETCUSTBILL_SUCCESS:
        return {
          billData: action.data.billData,
          success: true
        }
      case employeeConstants.GETALLCUST_FAILURE:
        return {}
      default:
        return state
    }
  }