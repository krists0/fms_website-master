import axios from 'axios';
import {GET_ERRORS,GET_CALLS,DELETE_CALL} from "./types";



export const addNewCall = (callData, history) => dispatch => {
    axios
        .post('/api/calls/addNewCall', callData)
        .then()
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const getCalls = () => dispatch => {
    //dispatch(setPostLoading());
    axios
        .get('/api/calls/getCalls')
        .then(res =>
            dispatch({
                type: GET_CALLS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_CALLS,
                payload: null
            })
        );
};

export const deleteCall = id => dispatch => {
    axios
        .delete(`/api/calls/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_CALL,
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