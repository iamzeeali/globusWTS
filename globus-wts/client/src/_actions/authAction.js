import axios from "axios";
import { setAlert } from "./alertAction";
import { USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./types";

// Load User
// export const loadUser = () => async dispatch => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

//   try {
//     const res = await axios.get("/api/user/me");

//     dispatch({
//       type: USER_LOADED,
//       payload: res.data.user
//     });
//   } catch (err) {
//     dispatch({
//       type: AUTH_ERROR
//     });
//   }
// };

// // Register User
// export const register = ({
//   firstName,
//   lastName,
//   username,
//   company,
//   country,
//   city,
//   phone,
//   email,
//   password
// }) => async dispatch => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };

//   const body = JSON.stringify({
//     firstName,
//     lastName,
//     username,
//     company,
//     country,
//     city,
//     phone,
//     email,
//     password
//   });

//   try {
//     const res = await axios.post("/api/users", body, config);

//     dispatch({
//       type: REGISTER_SUCCESS,
//       payload: res.data
//     });

//     dispatch(loadUser());
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
//     }

//     dispatch({
//       type: REGISTER_FAIL
//     });
//   }
// };

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/user/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    // dispatch(loadUser());
    dispatch({
      type: USER_LOADED,
      payload: res.data.data.user
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
