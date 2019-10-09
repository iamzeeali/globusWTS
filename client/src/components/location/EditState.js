import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import {
  editState,
  getCurrentState
} from "../../_actions/locationActions/stateAction";

const EditState = ({
  state: { state, loading },
  editState,
  getCurrentState,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    state: ""
  });

  useEffect(() => {
    getCurrentState(match.params.id);
    setFormData({
      state: loading || !state.state ? "" : state.state
    });
    //eslint-disable-next-line
  }, [loading, getCurrentState]);

  const onChangeHandler = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    editState(formData, history, match.params.id);
  };

  return (
    <Fragment>
      <div className="container-fluid m-auto">
        <div>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLongTitle">
                  Edit State
                </h3>
                <Link className="btn btn-light" to="/location/statemaster">
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
                      placeholder="Enter State"
                      name="state"
                      value={formData.state}
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

EditState.propTypes = {
  editState: PropTypes.func.isRequired,
  getCurrentState: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  state: state.state
});

export default connect(
  mapStateToProps,
  { editState, getCurrentState }
)(withRouter(EditState));
