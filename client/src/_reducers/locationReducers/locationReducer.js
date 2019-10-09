import * as types from "../../_actions/types";

const initialState = {
  location: null,
  locations: [],
  error: {},
  filtered: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_LOCATION:
      return {
        ...state,
        location: payload,
        loading: false
      };
    case types.GET_LOCATIONS:
      return {
        ...state,
        locations: payload,
        loading: false
      };
    case types.ADD_LOCATION:
      return {
        ...state,
        location: payload,
        loading: false
      };
    case types.SET_CURRENT_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    case types.CLEAR_LOCATION:
      return {
        ...state,
        location: null,
        locations: [],
        loading: false
      };

    // case types.FILTER_STAFF:
    //   return {
    //     ...state,
    //     filtered: state.states.filter(state => {
    //       const regex = new RegExp(`${action.payload}`, "gi");
    //       return (
    //         staff.firstName.match(regex) ||
    //         staff.lastName.match(regex) ||
    //         staff.email.match(regex) ||
    //         staff.mobile.match(regex) ||
    //         staff.username.match(regex)
    //       );
    //     })
    //   };
    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case types.DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(loc => loc._id !== action.payload),
        loading: false
      };
    case types.LOCATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
