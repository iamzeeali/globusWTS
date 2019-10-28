import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import {
  editLocation,
  getCurrentLocation
} from "../../_actions/locationActions/locationAction";

const EditLocation = ({
  location: { location, loading },
  editLocation,
  getCurrentLocation,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    address: "",
    pinCode: ""
  });

  useEffect(() => {
    getCurrentLocation(match.params.id);
    setFormData({
      address: loading || !location.address ? "" : location.address,
      pinCode: loading || !location.pinCode ? "" : location.pinCode
    });
  }, [loading, getCurrentLocation]);

  const onChangeHandler = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    editLocation(formData, history, match.params.id);
  };

  return (
    <Fragment>
      <div className="container-fluid m-auto">
        <div>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLongTitle">
                  Edit Location
                </h3>
                <Link className="btn btn-light" to="/location/locationmaster">
                  Back
                </Link>
              </div>

              {/*-- Modal Body Starts  -*/}
              <div className="modal-body">
                <form onSubmit={onSubmitHandler}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Address"
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

EditLocation.propTypes = {
  editLocation: PropTypes.func.isRequired,
  getCurrentLocation: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  location: state.location
});

export default connect(
  mapStateToProps,
  { editLocation, getCurrentLocation }
)(withRouter(EditLocation));
