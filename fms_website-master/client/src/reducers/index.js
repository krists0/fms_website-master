

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import employeeReducer from './employeeReducer';
import callReducer from './callReducer';
import activityReducer from "./activityReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    employee: employeeReducer,
    calls: callReducer,
    activity: activityReducer

});
