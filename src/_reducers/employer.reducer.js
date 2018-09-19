import {
  employerConstants
} from '../_constants';

export function employer(state = {}, action) {
  switch (action.type) {
    case employerConstants.CREATEEMP_REQUEST:
      return {
        creatingEmp: true
      };
    case employerConstants.CREATEEMP_SUCCESS:
      return {
        success: true
      };
    case employerConstants.CREATEEMP_FAILURE:
      return {};
    case employerConstants.GETALLEMP_REQUEST:
      return {
        fetchingEmp: true
      }
    case employerConstants.GETALLEMP_SUCCESS:
      return {
        success: true,
        allEmployees: action.data.allEmployees
      }
    case employerConstants.GETALLEMP_FAILURE:
      return {}
    default:
      return state
  }
}