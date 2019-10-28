import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getLocations,
  addLocation,
  deleteLocation,
  setCurrentLocation
} from "../../_actions/locationActions/locationAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const LocationMaster = ({
  getLocations,
  addLocation,
  deleteLocation,
  setCurrentLocation,
  locations,
  filtered,
  loading,
  history
}) => {
  useEffect(() => {
    getLocations();
    //eslint-diable-next-line
  }, [getLocations]);

  const onDeleteHandler = id => {
    deleteLocation(id);
  };

  return (
    <Fragment>
      <div className="container-fluid mt-4">
        <div className="form-title">
          <Link className="btn btn-primary" to="/location/addLocation">
            <i className="fa fa-plus mr-2"> </i>Add Location
          </Link>

          <Link to="/location/statemaster">
            <button className="btn btn-dark ml-2">State Master</button>
          </Link>
          <Link to="/location/citymaster">
            <button className="btn btn-dark ml-2">City Master</button>
          </Link>

          <h1 className="pt-4">Location Master</h1>
          <small className="lead">Add New Location into Database</small>
        </div>
        <br />

        <div className="row">
          <table className="table table-hover mt-4">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Location</th>
                <th scope="col">PIN Code</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col" className="text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {locations.map(loc => (
                <tr key={loc._id}>
                  <td>{loc.address}</td>
                  <td>{loc.pinCode}</td>
                  <td>{loc.city.city}</td>
                  <td>{loc.state.state}</td>
                  <td className="text-right">
                    <Link
                      to={`/editLocation/${loc._id}`}
                      onClick={() => setCurrentLocation(loc)}
                    >
                      <i className="far fa-edit fa-md mr-4"></i>
                    </Link>
                    <Link
                      title="Delete"
                      to="#!"
                      onClick={() => onDeleteHandler(loc._id)}
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

LocationMaster.propTypes = {
  getLocations: PropTypes.func.isRequired,
  addLocation: PropTypes.func.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  setCurrentLocation: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  locations: state.location.locations,
  state: state.location.locations,
  filtered: state.location.filtered,
  loading: state.location.loading
});
export default connect(
  mapStateToProps,
  { getLocations, addLocation, deleteLocation, setCurrentLocation }
)(LocationMaster);
