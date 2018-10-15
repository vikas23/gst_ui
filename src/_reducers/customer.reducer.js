import {
  customerConstants
} from '../_constants';

export function customer(state = {}, action) {
  switch (action.type) {
    case customerConstants.GETBILL_REQUEST:
      return {
        getBill: true
      }
    case customerConstants.GETBILL_SUCCESS:
      return {
        billData: action.data.billData,
        success: true
      }
    case customerConstants.GETALL_FAILURE:
      return {}
    case customerConstants.UPDATEBILL_REQUEST:
      return {
        updatingBill: true
      }
    case customerConstants.UPDATEBILL_SUCCESS:
      return {
        success: true
      }
    case customerConstants.UPDATEBILL_FAILURE:
      return {}
    case customerConstants.CHECKGST_REQUEST:
      return {
        checkStatus: true
      }
    case customerConstants.CHECKGST_SUCCESS:
      return {
        gstStatus: action.data.gstStatus,
        success: true
      }
    case customerConstants.CHECKGST_FAILURE:
      return {}
    default:
      return state
  }
}