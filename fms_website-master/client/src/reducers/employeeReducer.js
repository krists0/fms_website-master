import {
    GET_EMPLOYEES,
    EMPLOYEE_LOADING,
    ADD_EMPLOYEE,
    SHOW_EMPLOYEE,
    MANAGE_EMPLOYEE, DELETE_EMPLOYEE, ADD_EMPLOYEE_BTN, UPDATE_EMPLOYEE_DETAILS
} from '../actions/types';

const initialState = {
    employees: [],
    //employee: {},
    loading: false,
    showEmp:false,
    mng_Emp:false,
    add_Emp:false,
    //update_Emp:false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case EMPLOYEE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_EMPLOYEES:
            return {
                ...state,
                employees: action.payload,
                loading: false
            };
        case ADD_EMPLOYEE:
            return {
                ...state,
                employees: [action.payload, ...state.employees]
            };
        case DELETE_EMPLOYEE:
            return {
                ...state,
                employees: state.employees.filter(employee => employee._id !== action.payload)
            };
        case SHOW_EMPLOYEE:
            return{
                ...state,
                showEmp:!state.showEmp
            };
        case MANAGE_EMPLOYEE:
            return{
                ...state,
                mng_Emp:!state.mng_Emp
            };
        case ADD_EMPLOYEE_BTN:
            return {
                ...state,
                add_Emp: !state.add_Emp
            };
        // case  UPDATE_EMPLOYEE_DETAILS:
        //     return{
        //       ...state,
        //         update_Emp: !state.update_Emp
        //     };

        default:
            return state;
    }


}