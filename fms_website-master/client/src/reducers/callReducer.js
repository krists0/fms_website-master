import {ADD_CALLS, CALLS_LOADING, GET_CALLS,DELETE_CALL} from "../actions/types";


const initialState = {
    calls: [],
    loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CALLS_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_CALLS:
            return {
                ...state,
                calls: action.payload,
                loading: false
            };

        case ADD_CALLS:
            return {
                ...state,
                calls: [action.payload, ...state.employees]
            };

        case DELETE_CALL:
            return {
                ...state,
                calls: state.calls.filter(call => call._id !== action.payload)
            };


        default:
            return state;
    }


}