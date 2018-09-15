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
        data: action.data,
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
    default:
      return state
  }
}