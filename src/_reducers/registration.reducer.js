import {
  userConstants
} from '../_constants';

export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.CREATEEMPR_REQUEST:
      return {
        registering: true
      };
    case userConstants.CREATEEMPR_SUCCESS:
      return {};
    case userConstants.CREATEEMPR_FAILURE:
      return {};
    default:
      return state
  }
}