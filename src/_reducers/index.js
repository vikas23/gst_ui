import {
  combineReducers
} from 'redux';

import {
  authentication
} from './authentication.reducer';
import {
  registration
} from './registration.reducer';
import {
  alert
} from './alert.reducer';
import {
  employer
} from './employer.reducer';
import {
  employee
} from './employee.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  employer,
  employee,
});

export default rootReducer;