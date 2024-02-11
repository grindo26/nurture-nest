import axios from "axios";
import {
    ADD_CHILD,
    ADD_CHILD_SUCCESS,
    ADD_CHILD_FAILURE,
    FETCH_CHILD,
    FETCH_CHILDREN_FAILURE,
    FETCH_CHILDREN_SUCCESS,
    DELETE_CHILD_SUCCESS,
    DELETE_CHILD_FAILURE,
} from "./childActionTypes";

export const setChildSuccess = (userObj) => {
    return {
        type: ADD_CHILD_SUCCESS,
        payload: userObj,
    };
};

export const setChildFailure = (error) => {
    return {
        type: ADD_CHILD_FAILURE,
        payload: error,
    };
};

export const createChildAPICall = (obj) => {
    return async (dispatch) => {
        try {
            let { data } = await axios.post(`https://nurture-nest-backend.vercel.app/child`, obj);
            dispatch(setChildSuccess(data));
        } catch (error) {
            dispatch(setChildFailure(error));
        }
    };
};

export const setFetchChildSuccess = (childObjs) => {
    return {
        type: FETCH_CHILDREN_SUCCESS,
        payload: childObjs,
    };
};

export const setFetchChildFailure = (error) => {
    return {
        type: FETCH_CHILDREN_SUCCESS,
        payload: error,
    };
};

export const fetchChildrenAPICall = (userId) => {
    return async (dispatch) => {
        try {
            let { data } = await axios.get(`https://nurture-nest-backend.vercel.app/users/children/${userId}`);
            dispatch(setFetchChildSuccess(data));
        } catch (error) {
            dispatch(setFetchChildFailure(error));
        }
    };
};

export const deleteChildSuccess = (data) => {
    return {
        type: DELETE_CHILD_SUCCESS,
        payload: data,
    };
};

export const deleteChildFailure = (error) => {
    return {
        type: DELETE_CHILD_FAILURE,
        payload: error,
    };
};

export const deleteChilDAPICall = (childId, obj) => {
    return async (dispatch) => {
        try {
            let { data } = await axios.delete("https://nurture-nest-backend.vercel.app/child/removeChild/" + childId, { data: obj });
            dispatch(deleteChildSuccess(data));
        } catch (error) {
            dispatch(deleteChildFailure(error));
        }
    };
};
