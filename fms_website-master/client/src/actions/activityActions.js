import axios from "axios";
import {DELETE_ACTIVITY, GET_ACTIVITY, GET_ERRORS, ADD_ACTIVITY} from "./types";

export const addNewActivity = (activityData) => dispatch => {
    axios
        .post('/api/activity/addNewActivity', activityData)
        .then( res =>
            dispatch({
                type: ADD_ACTIVITY,
                payload: res.data
            }))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};



export const getActivity = () => dispatch => {

    axios
        .get('/api/activity/getActivity')
        .then(res =>
            dispatch({
                type: GET_ACTIVITY,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ACTIVITY,
                payload: null
            })
        );
};

export const deleteActivity = id => dispatch => {
    axios
        .delete(`/api/activity/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_ACTIVITY,
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