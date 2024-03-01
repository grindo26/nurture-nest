import axios from "axios";
import {
    GET_VACCINE_SUCCESS,
    GET_VACCINE_FAILURE,
    SET_VACCINE_SUCCESS,
    SET_VACCINE_FAILURE,
    VACCINE_DELETE_SUCCESS,
    VACCINE_DELETE_FAILURE,
    SET_VACCINE_TRIGGER,
} from "./vaccineActionTypes";

export const vaccinesSetTrigger = () => {
    return {
        type: SET_VACCINE_TRIGGER,
    };
};

export const getVaccinesSuccess = (vaccine) => {
    return {
        type: GET_VACCINE_SUCCESS,
        payload: vaccine,
    };
};

export const getVaccinesFailure = (error) => {
    return {
        type: GET_VACCINE_FAILURE,
        payload: error,
    };
};

export const vaccinesSetSuccess = (vaccine) => {
    return {
        type: SET_VACCINE_SUCCESS,
        payload: vaccine,
    };
};

export const vaccinesSetFailure = (error) => {
    return {
        type: SET_VACCINE_FAILURE,
        payload: error,
    };
};

export const vaccineDeleteSuccess = (vaccine) => {
    return {
        type: VACCINE_DELETE_SUCCESS,
        payload: vaccine,
    };
};

export const vaccinesDeleteFailure = (error) => {
    return {
        type: VACCINE_DELETE_FAILURE,
        payload: error,
    };
};

export const getVaccineAPICall = (childId) => {
    return async (dispatch) => {
        try {
            let resp = await axios.get("http://54.167.82.222:80child/vaccine/" + childId);
            dispatch(getVaccinesSuccess(resp?.data));
        } catch (error) {
            dispatch(getVaccinesFailure(error));
        }
    };
};

export const vaccineSetAPICall = (obj, childId) => {
    return async (dispatch) => {
        try {
            dispatch(vaccinesSetTrigger());
            let resp = await axios.post("http://54.167.82.222:80child/vaccine/" + childId, obj);
            dispatch(vaccinesSetSuccess(resp?.data));
        } catch (error) {
            dispatch(vaccinesSetFailure(error));
        }
    };
};

export const delVaccineAPICall = (vaccineId) => {
    return async (dispatch) => {
        try {
            dispatch(vaccinesSetTrigger());
            let resp = await axios.delete("http://54.167.82.222:80child/vaccine/" + vaccineId);
            dispatch(vaccineDeleteSuccess(resp?.data));
        } catch (error) {
            dispatch(vaccinesDeleteFailure(error));
        }
    };
};
