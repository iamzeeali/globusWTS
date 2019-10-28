import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../_actions/authAction";
import $ from "jquery";

class Sidebar extends Component {
  componentDidMount() {
    this.onCloseSidebar();
  }

  onLogoutHandler = e => {
    e.preventDefault();
    this.props.logout();
  };

  onCloseSidebar = e => {
    $("#close-sidebar").click(function() {
      $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function() {
      $(".page-wrapper").addClass("toggled");
    });
  };

  onDropDown = e => {
    $(".sidebar-dropdown > a").click(function() {
      $(".sidebar-submenu").slideUp(200);
      if (
        $(this)
          .parent()
          .hasClass("active")
      ) {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
          .parent()
          .removeClass("active");
      } else {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
          .next(".sidebar-submenu")
          .slideDown(200);
        $(this)
          .parent()
          .addClass("active");
      }
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    console.log(user);

    const authLinks = (
      <Fragment>
        <div
          class="w3-sidebar w3-bar-block w3-light-grey w3-card"
          style={{ width: "17%" }}
        >
          <h2 style={{ textAlign: "center" }}>Globus WTS</h2>
          <Link to="/" class="w3-bar-item w3-button">
            Dashboard
          </Link>
          <div class="w3-dropdown-hover">
            <button class="w3-button">
              Location Details &nbsp; <i class="fa fa-caret-down"></i>
            </button>
            <div class="w3-dropdown-content w3-bar-block pl-2 ">
              <Link to="/location/statemaster" class="w3-bar-item w3-button">
                State Master
              </Link>
              <Link to="/location/citymaster" class="w3-bar-item w3-button">
                City Master
              </Link>
              <Link to="/location/locationmaster" class="w3-bar-item w3-button">
                Location Master
              </Link>
            </div>
          </div>

          <div class="w3-dropdown-hover">
            <button class="w3-button">
              Company Details &nbsp; <i class="fa fa-caret-down"></i>
            </button>
            <div class="w3-dropdown-content w3-bar-block pl-4">
              <Link to="/company/branch" class="w3-bar-item w3-button">
                Company Branch
              </Link>
              <Link to="/location/employeedetail" class="w3-bar-item w3-button">
                Employee Detail
              </Link>
            </div>
          </div>

          <div class="w3-dropdown-hover">
            <button class="w3-button">
              Supplier Details &nbsp; <i class="fa fa-caret-down"></i>
            </button>
            <div class="w3-dropdown-content w3-bar-block pl-4">
              <Link to="/supplier/suppliermaster" class="w3-bar-item w3-button">
                Supplier Master
              </Link>
              <Link to="/supplier/supplierbranch" class="w3-bar-item w3-button">
                Supplier Branch
              </Link>
            </div>
          </div>
        </div>

        <div style={{ marginLeft: "17%" }}>
          <div class="w3-container">{this.props.children}</div>
        </div>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark border-bottom border-secondary">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <h2>Globus WTS</h2>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active lead">
                  <Link className="nav-link" to="/">
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item lead">
                  <Link className="nav-link" to="/register">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item lead">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Body Content */}
        <main className="page-content">
          <div className="">{this.props.children}</div>
        </main>
      </Fragment>
    );

    return <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>;
  }
}

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Sidebar);
