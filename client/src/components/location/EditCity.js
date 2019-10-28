import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import {
  editCity,
  getCurrentCity
} from "../../_actions/locationActions/cityAction";

const EditCity = ({
  city: { city, loading },
  editCity,
  getCurrentCity,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    city: ""
  });

  useEffect(() => {
    getCurrentCity(match.params.id);
    setFormData({
      city: loading || !city.city ? "" : city.city
    });
    //eslint-disable-next-line
  }, [loading, getCurrentCity]);

  const onChangeHandler = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    editCity(formData, history, match.params.id);
  };

  return (
    <Fragment>
      <div className="container-fluid m-auto">
        <div>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLongTitle">
                  Edit City
                </h3>
                <Link className="btn btn-light" to="/location/citymaster">
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
                      placeholder="Edit City"
                      name="city"
                      value={formData.city}
                      onChange={e => onChangeHandler(e)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Submit
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

EditCity.propTypes = {
  editCity: PropTypes.func.isRequired,
  getCurrentCity: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  city: state.city
});

export default connect(
  mapStateToProps,
  { editCity, getCurrentCity }
)(withRouter(EditCity));
