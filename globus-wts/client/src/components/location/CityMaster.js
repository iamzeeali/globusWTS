import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getCities,
  addCity,
  deleteCity,
  setCurrentCity
} from "../../_actions/locationActions/cityAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CityMaster = ({
  getCities,
  deleteCity,
  setCurrentCity,
  cities,
  filtered,
  loading,
  history
}) => {
  useEffect(() => {
    getCities();
    //eslint-diable-next-line
  }, [getCities]);

  const onDeleteHandler = id => {
    deleteCity(id);
  };

  return (
    <Fragment>
      <div className="container-fluid mt-4">
        <div className="form-title">
          <Link className="btn btn-primary" to="/location/addCity">
            <i className="fa fa-plus mr-2"> </i>Add City
          </Link>

          <Link to="/location/statemaster">
            <button className="btn btn-dark ml-2">State Master</button>
          </Link>
          <Link to="/location/locationmaster">
            <button className="btn btn-dark ml-2">Location Master</button>
          </Link>

          <h1 className="pt-4">City Master</h1>
          <small className="lead">Add New City into Database</small>
        </div>
        <br />

        <div className="row">
          <table className="table table-hover mt-4">
            <thead className="thead-dark">
              <tr>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col" className="text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {cities.map(city => (
                <tr key={city._id}>
                  <td>{city.city}</td>
                  <td>{city.state.state}</td>
                  <td className="text-right">
                    <Link
                      to={`/editCity/${city._id}`}
                      onClick={() => setCurrentCity(city)}
                    >
                      <i className="far fa-edit fa-md mr-4"></i>
                    </Link>
                    <Link
                      title="Delete"
                      to="#!"
                      onClick={() => onDeleteHandler(city._id)}
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

CityMaster.propTypes = {
  getCities: PropTypes.func.isRequired,
  addCity: PropTypes.func.isRequired,
  deleteCity: PropTypes.func.isRequired,
  setCurrentCity: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  cities: state.city.cities,
  state: state.city.cities,
  filtered: state.city.filtered,
  loading: state.city.loading
});
export default connect(
  mapStateToProps,
  { getCities, addCity, deleteCity, setCurrentCity }
)(CityMaster);
