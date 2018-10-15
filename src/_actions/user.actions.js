import {
  userConstants
} from '../_constants';
import {
  userService
} from '../_services';
import {
  alertActions
} from './';
import {
  history
} from '../_helpers';

const USERTYPE = {
  EMPLOYER: 1,
  EMPLOYEE: 2,
  CUSTOMER: 3,
}

export const userActions = {
  login,
  logout,
  registeEmployer,
};

function login(phone, password) {
  return dispatch => {
    dispatch(request({
      phone
    }));

    userService.login(phone, password)
      .then(
        user => {
          dispatch(success(user));
          switch (user.userType) {
            case USERTYPE.EMPLOYER:
              history.push('/');
              break;
            case USERTYPE.EMPLOYEE:
              history.push('/customerManagement');
              break;
            case USERTYPE.CUSTOMER:
              history.push('/customerMain');
              break;
            default:
              break;
          }
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(user) {
    return {
      type: userConstants.LOGIN_REQUEST,
      user
    }
  }

  function success(user) {
    return {
      type: userConstants.LOGIN_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: userConstants.LOGIN_FAILURE,
      error
    }
  }
}

function logout() {
  userService.logout();
  history.push('/')
  return {
    type: userConstants.LOGOUT
  };
}

function registeEmployer(user) {
  return dispatch => {
    dispatch(request(user));

    userService.registerEmployer(user)
      .then(
        user => {
          dispatch(success());
          history.push('/login');
          dispatch(alertActions.success('Registration successful'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(user) {
    return {
      type: userConstants.CREATEEMPR_REQUEST,
      user
    }
  }

  function success(user) {
    return {
      type: userConstants.CREATEEMPR_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: userConstants.CREATEEMPR_FAILURE,
      error
    }
  }
}