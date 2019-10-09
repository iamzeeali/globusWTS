import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { addState } from "../../_actions/locationActions/stateAction";

const AddState = ({ addState, history }) => {
  const [formData, setFormData] = useState({
    state: ""
  });

  const { state } = formData;

  const onChangeHandler = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    addState(formData, history);
  };

  return (
    <Fragment>
      <div className="container-fluid m-auto">
        <div>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLongTitle">
                  Add State
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
                      value={state}
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

AddState.propTypes = {
  addState: PropTypes.func.isRequired,
  setCurrentState: PropTypes.func.isRequired
};

export default connect(
  null,
  { addState }
)(AddState);
