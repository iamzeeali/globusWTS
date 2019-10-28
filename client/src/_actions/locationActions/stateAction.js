import axios from "axios";
import { setAlert } from "../alertAction";
import * as types from "../types";

// Get current state
export const getCurrentState = id => async dispatch => {
  try {
    const res = await axios.get(`/api/state/${id}`);
    console.log(res.data);

    dispatch({
      type: types.GET_STATE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.STATE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get all States
export const getStates = () => async dispatch => {
  try {
    const res = await axios.get("/api/state");
    console.log(res.data.data);
    dispatch({
      type: types.GET_STATES,
      payload: res.data.data
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.STATE_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

// Add state
export const addState = (formData, history) => async dispatch => {
  try {
    const res = await axios.post("/api/state", formData);
    dispatch({
      type: types.ADD_STATE,
      payload: res.data
    });
    history.push("/location/statemaster");

    dispatch(setAlert("State Added!", "success"));
  } catch (err) {
    const errors = err.response.data.error;
    console.log(errors);

    if (errors.code === 11000) {
      dispatch(setAlert("State already exists!", "danger"));
    }

    dispatch({
      type: types.STATE_ERROR,
      payload: { msg: errors, status: err.response.status }
    });
  }
};

// Edit state
export const editState = (formData, history, id) => async dispatch => {
  try {
    const res = await axios.patch(`/api/state/${id}`, formData);

    dispatch({
      type: types.GET_STATE,
      payload: res.data
    });

    history.push("/location/statemaster");

    dispatch(setAlert("State Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.STATE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete state
export const deleteState = id => async dispatch => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/state/${id}`);
      dispatch({
        type: types.DELETE_STATE,
        payload: id
      });
      dispatch(setAlert("State Deleted!", "danger"));
    } catch (err) {
      dispatch({
        type: types.STATE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

//Set Current state
export const setCurrentState = state => async dispatch => {
  dispatch({
    type: types.SET_CURRENT_STATE,
    payload: state
  });
};

// Clear state
export const clearState = () => async dispatch => {
  dispatch({ type: types.CLEAR_STATE });
};

//Filter state
export const filterstate = text => async dispatch => {
  dispatch({ type: types.FILTER_STATE, payload: text });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
  dispatch({ type: types.CLEAR_FILTER });
};
