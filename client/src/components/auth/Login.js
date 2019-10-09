import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../_actions/authAction";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChangeHandler = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="container h-100">
      <div className="row align-self-center h-100  mx-auto my-5">
        <div className="col-md-6 py-5 bg-primary text-white text-center">
          <div className=" ">
            <div className="card-body">
              <img
                src="http://www.ansonika.com/mavia/img/registration_bg.svg"
                style={{ width: "40%" }}
                alt="login"
              />
              <h1 className="">Globus WTS</h1>
              <small className="text-light">
                <i>
                  powered by{" "}
                  <Link to="" className="text-light">
                    globus labs{" "}
                  </Link>
                </i>
              </small>
              <p className="lead pt-4">Don't have an account? &nbsp;</p>
              <Link
                to="/register"
                className="btn btn-outline-light btn-block btn-lg"
              >
                {" "}
                Sign Up
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 py-5 border">
          <h1 className="container">Log In...</h1>
          <p className="lead container pb-2">
            Sign in to your Billing One account...
          </p>
          <form className="container" onSubmit={e => onSubmitHandler(e)}>
            <div className="form-row">
              <div className="form-group col-md-12">
                <input
                  name="email"
                  placeholder="Email"
                  className="form-control form-control-lg"
                  type="email"
                  value={email}
                  onChange={e => onChangeHandler(e)}
                />
              </div>
              <div className="form-group col-md-12">
                <input
                  name="password"
                  placeholder="Password"
                  className="form-control form-control-lg"
                  type="password"
                  value={password}
                  onChange={e => onChangeHandler(e)}
                />
              </div>
            </div>
            <div className="form-row">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { login }
)(Login);
