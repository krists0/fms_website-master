import axios from 'axios';
import {
    GET_ERRORS,
    GET_EMPLOYEES,
    ADD_EMPLOYEE,
    EMPLOYEE_LOADING,
    SHOW_EMPLOYEE,
    MANAGE_EMPLOYEE,
    DELETE_EMPLOYEE, ADD_EMPLOYEE_BTN
} from "./types";




export const addNewEmployee = empData => dispatch => {

    axios
        .post('/api/employees/addNewEmployee', empData)
        .then(res =>
            dispatch({
                type: ADD_EMPLOYEE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};



export const getEmployees=()=>dispatch=>{
    dispatch(setEmployeeLoading());
axios
    .get('/api/employees/getEmployees')
    .then(res=>
    dispatch({
        type:GET_EMPLOYEES,
        payload:res.data
    }))
    .catch(err =>
        dispatch({
            type: GET_EMPLOYEES,
            payload: null
        })
    );



};

export const deleteEmployee = id => dispatch => {
    axios
        .delete(`/api/employees/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_EMPLOYEE,
                payload: id
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


export const updateEmployee = empData=> dispatch  => {

    axios
        .post('/api/employees/update', empData);
        // .then()
        // .catch(err=> dispatch({
        //     type: GET_ERRORS,
        //     payload: err.response.data
        // }));
};



// Set loading state
export const setEmployeeLoading = () => {
    return {
        type: EMPLOYEE_LOADING
    };
};

export const setShowEmployee = () => {
    return {
        type: SHOW_EMPLOYEE

    };
};

export const setManageEmployee = () => {
    return {
        type: MANAGE_EMPLOYEE

    };
};

export const setAddEmployee = () => {
    return {
        type: ADD_EMPLOYEE_BTN

    };
};