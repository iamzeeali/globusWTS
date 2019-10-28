import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { addCity } from "../../_actions/locationActions/cityAction";
import { getStates } from "../../_actions/locationActions/stateAction";

const AddCity = ({ addCity, getStates, states, history }) => {
  useEffect(() => {
    getStates();
    //eslint-diable-next-line
  }, [getStates]);

  const [formData, setFormData] = useState({
    state: "",
    city: ""
  });

  const { state, city } = formData;

  const onChangeHandler = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    addCity(formData, history);
  };

  let options = states.map(state => (
    <option key={state._id} value={state._id}>
      {state.state}
    </option>
  ));

  return (
    <Fragment>
      <div className="container-fluid m-auto">
        <div>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLongTitle">
                  Add City
                </h3>
                <Link className="btn btn-light" to="/location/citymaster">
                  Back
                </Link>
              </div>

              {/*-- Modal Body Starts  -*/}
              <div className="modal-body">
                <form onSubmit={onSubmitHandler}>
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="state"
                      value={state}
                      defaultValue={{ label: "Select Dept", value: 0 }}
                      onChange={e => onChangeHandler(e)}
                    >
                      <option>Select State</option>
                      {options}
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter City"
                      name="city"
                      value={city}
                      onChange={e => onChangeHandler(e)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AddCity.propTypes = {
  getStates: PropTypes.func.isRequired,
  addCity: PropTypes.func.isRequired
  // setCurrentCity: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  states: state.state.states
});

export default connect(
  mapStateToProps,
  { addCity, getStates }
)(AddCity);
