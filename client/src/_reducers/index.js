import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import state from "./locationReducers/stateReducer";
import city from "./locationReducers/cityReducer";
import location from "./locationReducers/locationReducer";

export default combineReducers({
  auth,
  alert,
  state,
  city,
  location
});
