import * as types from "../../_actions/types";

const initialState = {
  state: null,
  states: [],
  error: {},
  filtered: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_STATE:
      return {
        ...state,
        state: payload,
        loading: false
      };
    case types.GET_STATES:
      return {
        ...state,
        states: payload,
        loading: false
      };
    case types.ADD_STATE:
      return {
        ...state,
        state: payload,
        loading: false
      };
    case types.SET_CURRENT_STATE:
      return {
        ...state,
        state: action.payload
      };
    case types.CLEAR_STATE:
      return {
        ...state,
        state: null,
        states: [],
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
    case types.DELETE_STATE:
      return {
        ...state,
        states: state.states.filter(state => state._id !== action.payload),
        loading: false
      };
    case types.STATE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
