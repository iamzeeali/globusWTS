import axios from "axios";
import { setAlert } from "../alertAction";
import * as types from "../types";

// Get current city
export const getCurrentCity = id => async dispatch => {
  try {
    const res = await axios.get(`/api/city/${id}`);
    console.log(res.data);

    dispatch({
      type: types.GET_CITY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.CITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get all citys
export const getCities = () => async dispatch => {
  try {
    const res = await axios.get("/api/city");
    console.log(res.data);
    dispatch({
      type: types.GET_CITIES,
      payload: res.data.data
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.city_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

// Add city
export const addCity = (formData, history) => async dispatch => {
  console.log(formData);
  try {
    const res = await axios.post("/api/city", formData);
    dispatch({
      type: types.ADD_CITY,
      payload: res.data
    });
    history.push("/location/citymaster");

    dispatch(setAlert("City Added!", "success"));
  } catch (err) {
    const errors = err.response.data.error;
    console.log(errors);

    if (errors.code === 11000) {
      dispatch(setAlert("City already exists!", "danger"));
    }

    dispatch({
      type: types.CITY_ERROR,
      payload: { msg: errors, status: err.response.status }
    });
  }
};

// Edit city
export const editCity = (formData, history, id) => async dispatch => {
  try {
    const res = await axios.patch(`/api/city/${id}`, formData);

    dispatch({
      type: types.GET_CITY,
      payload: res.data
    });

    history.push("/location/citymaster");

    dispatch(setAlert("City Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.CITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete city
export const deleteCity = id => async dispatch => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/city/${id}`);
      dispatch({
        type: types.DELETE_CITY,
        payload: id
      });
      dispatch(setAlert("City Deleted!", "danger"));
    } catch (err) {
      dispatch({
        type: types.CITY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

//Set Current city
export const setCurrentCity = city => async dispatch => {
  dispatch({
    type: types.SET_CURRENT_CITY,
    payload: city
  });
};

// Clear city
export const clearCity = () => async dispatch => {
  dispatch({ type: types.CLEAR_CITY });
};

//Filter city
export const filterCity = text => async dispatch => {
  dispatch({ type: types.FILTER_CITY, payload: text });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
  dispatch({ type: types.CLEAR_FILTER });
};
