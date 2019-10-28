import axios from "axios";
import { setAlert } from "../alertAction";
import * as types from "../types";

// Get current location
export const getCurrentLocation = id => async dispatch => {
  try {
    const res = await axios.get(`/api/location/${id}`);
    // console.log(res.data);

    dispatch({
      type: types.GET_LOCATION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.LOCATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get all locations
export const getLocations = () => async dispatch => {
  try {
    const res = await axios.get("/api/location");
    console.log(res.data);
    dispatch({
      type: types.GET_LOCATIONS,
      payload: res.data.data
    });
  } catch (err) {
    // dispatch({
    //   type: types.location_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

// Add location
export const addLocation = (formData, history) => async dispatch => {
  console.log(formData);
  try {
    const res = await axios.post("/api/location", formData);
    dispatch({
      type: types.ADD_LOCATION,
      payload: res.data
    });
    history.push("/location/locationmaster");

    dispatch(setAlert("Location Added!", "success"));
  } catch (err) {
    const errors = err.response.data.error;
    console.log(errors);

    dispatch({
      type: types.LOCATION_ERROR,
      payload: { msg: errors, status: err.response.status }
    });
  }
};

// Edit location
export const editLocation = (formData, history, id) => async dispatch => {
  try {
    const res = await axios.patch(`/api/location/${id}`, formData);

    dispatch({
      type: types.GET_LOCATION,
      payload: res.data
    });

    history.push("/location/locationmaster");

    dispatch(setAlert("Location Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.LOCATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete location
export const deleteLocation = id => async dispatch => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/location/${id}`);
      dispatch({
        type: types.DELETE_LOCATION,
        payload: id
      });
      dispatch(setAlert("Location Deleted!", "danger"));
    } catch (err) {
      dispatch({
        type: types.LOCATION_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

//Set Current location
export const setCurrentLocation = location => async dispatch => {
  dispatch({
    type: types.SET_CURRENT_LOCATION,
    payload: location
  });
};

// Clear location
export const clearLocation = () => async dispatch => {
  dispatch({ type: types.CLEAR_LOCATION });
};

//Filter location
export const filterLocation = text => async dispatch => {
  dispatch({ type: types.FILTER_LOCATION, payload: text });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
  dispatch({ type: types.CLEAR_FILTER });
};
