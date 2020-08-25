import {ADD_ACTIVITY, ACTIVITY_LOADING, GET_ACTIVITY,DELETE_ACTIVITY} from "../actions/types";


const initialState = {
    activity: [],
    loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ACTIVITY_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ACTIVITY:
            return {
                ...state,
                activity: action.payload,
                loading: false
            };

        case ADD_ACTIVITY:
            return {
                ...state,
                activity: state.activity.concat(action.payload)
            };

        case DELETE_ACTIVITY:
            return {
                ...state,
                activity: state.activity.filter(act => act._id !== action.payload)
            };


        default:
            return state;
    }


}