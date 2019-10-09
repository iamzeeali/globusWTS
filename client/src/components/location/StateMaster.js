import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getStates,
  addState,
  deleteState,
  setCurrentState
} from "../../_actions/locationActions/stateAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const StateMaster = ({
  getStates,
  deleteState,
  setCurrentState,
  states,
  filtered,
  loading,
  history
}) => {
  useEffect(() => {
    getStates();
    //eslint-diable-next-line
  }, [getStates]);

  const onDeleteHandler = id => {
    deleteState(id);
  };

  return (
    <Fragment>
      <div className="container-fluid mt-4">
        <div className="form-title">
          <Link className="btn btn-primary" to="/location/addState">
            <i className="fa fa-plus mr-2"> </i>Add State
          </Link>

          <Link to="/location/citymaster">
            <button className="btn btn-dark ml-2">City Master</button>
          </Link>
          <Link to="/location/locationmaster">
            <button className="btn btn-dark ml-2">City Location Master</button>
          </Link>

          <h1 className="pt-4">State Master</h1>
          <small className="lead">Add new State into Database</small>
        </div>
        <br />

        <div className="row">
          <table className="table table-hover mt-4">
            <thead className="thead-dark">
              <tr>
                <th scope="col">State</th>
                <th scope="col" className="text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {states.map(state => (
                <tr key={state._id}>
                  <td>{state.state}</td>
                  <td className="text-right">
                    <Link
                      to={`/editState/${state._id}`}
                      onClick={() => setCurrentState(state)}
                    >
                      <i className="far fa-edit fa-md mr-4"></i>
                    </Link>
                    <Link
                      title="Delete"
                      to="#!"
                      onClick={() => onDeleteHandler(state._id)}
                    >
                      <i className="far fa-trash-alt text-danger fa-md"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

StateMaster.propTypes = {
  getStates: PropTypes.func.isRequired,
  addState: PropTypes.func.isRequired,
  deleteState: PropTypes.func.isRequired,
  setCurrentState: PropTypes.func.isRequired,
  states: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  states: state.state.states,
  state: state.state.state,
  filtered: state.state.filtered,
  loading: state.state.loading
});
export default connect(
  mapStateToProps,
  { getStates, addState, deleteState, setCurrentState }
)(StateMaster);
