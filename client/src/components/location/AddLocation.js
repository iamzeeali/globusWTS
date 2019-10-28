import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getCities } from "../../_actions/locationActions/cityAction";
import { getStates } from "../../_actions/locationActions/stateAction";
import { addLocation } from "../../_actions/locationActions/locationAction";

const AddLocation = ({
  getCities,
  getStates,
  addLocation,
  states,
  cities,
  history
}) => {
  useEffect(() => {
    getStates();
    getCities();
    //eslint-diable-next-line
  }, [getStates, getCities]);

  const [formData, setFormData] = useState({
    address: "",
    pinCode: "",
    state: "",
    city: ""
  });

  const onChangeHandler = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    addLocation(formData, history);
  };

  let stateOptions = states.map(state => (
    <option key={state._id} value={state._id}>
      {state.state}
    </option>
  ));

  let cityOptions = cities.map(city => (
    <option key={city._id} value={city._id}>
      {city.city}
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
                  Add Location
                </h3>
                <Link className="btn btn-light" to="/location/locationmaster">
                  Back
                </Link>
              </div>

              {/*-- Modal Body Starts  -*/}
              <div className="modal-body">
                <form onSubmit={onSubmitHandler}>
                  <div className="form-group">
                    <select
                      className="form-control"
                      label="State"
                      name="state"
                      width={8}
                      onChange={e => onChangeHandler(e)}
                    >
                      <option>Select State</option>
                      {stateOptions}
                    </select>
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control"
                      label="City"
                      name="city"
                      width={8}
                      selection
                      onChange={e => onChangeHandler(e)}
                    >
                      <option>Select City</option>
                      {cityOptions}
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Location"
                      name="address"
                      value={formData.address}
                      onChange={e => onChangeHandler(e)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter PIN Code"
                      name="pinCode"
                      value={formData.pinCode}
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

AddLocation.propTypes = {
  getStates: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  addLocation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  states: state.state.states,
  cities: state.city.cities
});

export default connect(
  mapStateToProps,
  { addLocation, getStates, getCities }
)(AddLocation);
