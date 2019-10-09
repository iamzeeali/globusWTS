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
      <div>
        <div className="page-wrapper chiller-theme toggled">
          <Link id="show-sidebar" className="btn btn-sm btn-dark" to="#">
            <i className="fas fa-bars"></i>
          </Link>
          <nav id="sidebar" className="sidebar-wrapper">
            <div className="sidebar-content">
              <div className="sidebar-brand">
                <Link to="/">WTS Solution</Link>

                <div
                  id="close-sidebar"
                  onClick={this.onCloseSidebar.bind(this)}
                >
                  <i className="fas fa-times"></i>
                </div>
              </div>
              <div className="sidebar-header">
                <div className="user-pic">
                  <img
                    className="img-responsive img-rounded"
                    src="https://static.businessinsider.com/image/585c51bbee14b617038b4f80/image.jpg"
                    alt="User"
                  />
                </div>
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-role">{user.role}</span>
                  <span className="user-status">
                    <i className="fa fa-circle"></i>
                    <span>Online</span>
                  </span>
                </div>
              </div>
              {/*-- sidebar-header  -*/}
              <div className="sidebar-search">
                <div>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control search-menu"
                      placeholder="Search..."
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/*-- sidebar-search  -*/}
              <div className="sidebar-menu">
                <ul>
                  <li>
                    <Link to="./table">
                      <i className="fa fa-tachometer-alt"></i>
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li className="header-menu">
                    <span>Master Form</span>
                  </li>

                  <li
                    className="sidebar-dropdown"
                    onClick={this.onDropDown.bind(this)}
                  >
                    <Link to="#">
                      <i className="fa fa-compass"></i>
                      <span>Location Details</span>
                    </Link>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <Link to="/location/statemaster">State Master</Link>
                        </li>
                        <li>
                          <Link to="/location/citymaster">City Master</Link>
                        </li>
                        <li>
                          <Link to="/location/city-location-master">
                            City Location Master
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="sidebar-dropdown">
                    <Link to="./table">
                      <i className="fa fa-music"></i>
                      <span>Plantronics Details</span>
                    </Link>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <Link to="/plantronics/branch">
                            Plantronics Branch
                          </Link>
                        </li>
                        <li>
                          <Link to="/plantronics/employee-detail">
                            Employee Detail
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="sidebar-dropdown">
                    <Link to="./table">
                      <i className="fa fa-users"></i>
                      <span>Supplier Details</span>
                    </Link>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <Link to="/supplier/supplier-master">
                            Supplier Master
                          </Link>
                        </li>
                        <li>
                          <Link to="/supplier/supplier-branch-master">
                            Supplier Branch
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="sidebar-dropdown">
                    <Link to="#">
                      <i className="fa fa-user"></i>
                      <span>Customer Details</span>
                    </Link>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <Link to="/customer/category">Category Type</Link>
                        </li>
                        <li>
                          <Link to="/customer/customer-master">
                            Customer Master
                          </Link>
                        </li>
                        <li>
                          <Link to="/customer/customer-detail">
                            Customer Branch
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="sidebar-dropdown">
                    <Link to="#">
                      <i className="fa fa-shopping-cart"></i>
                      <span>Product Details</span>
                    </Link>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <Link to="/product/warranty-scheme">
                            Warranty Scheme
                          </Link>
                        </li>
                        <li>
                          <Link to="/product/product-type">Product Type</Link>
                        </li>
                        <li>
                          <Link to="/product/product-detail">
                            Product Detail
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="sidebar-dropdown">
                    <Link to="#">
                      <i className="fa fa-id-card"></i>
                      <span>User Details</span>
                    </Link>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <Link to="/user/industry-type">Industry Type</Link>
                        </li>
                        <li>
                          <Link to="/user/user-type-master">
                            User Type Master
                          </Link>
                        </li>
                        <li>
                          <Link to="/user/user-creation">User Creation</Link>
                        </li>
                        <li>
                          <Link to="/user/user-detail">Unlock User</Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li>
                    <Link to="./table">
                      <i className="fa fa-eye"></i>
                      <span>Assign Role</span>
                    </Link>
                  </li>

                  <li className="header-menu">
                    <span>Extra</span>
                  </li>

                  <li className="sidebar-dropdown">
                    <Link to="#">
                      <i className="fa fa-sort"></i>
                      <span>Schedule Management</span>
                    </Link>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <Link to="/schedule/visit">Visit Schedule </Link>
                        </li>
                        <li>
                          <Link to="/schedule/tag">Headset Tag Schedule</Link>
                        </li>
                        <li>
                          <Link to="/schedule/tag">View Schedule</Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li>
                    <Link to="./table">
                      <i className="fa fa-flag"></i>
                      <span>Reports</span>
                    </Link>
                  </li>
                </ul>
              </div>
              {/*-- sidebar-menu  -*/}
            </div>
            {/*-- sidebar-Content  -*/}
            <div className="sidebar-footer">
              <Link to="./table">
                <i className="fa fa-bell"></i>
                <span className="badge badge-pill badge-warning notification">
                  3
                </span>
              </Link>
              <Link to="./table">
                <i className="fa fa-envelope"></i>
                <span className="badge badge-pill badge-success notification">
                  7
                </span>
              </Link>
              <Link to="./table">
                <i className="fa fa-cog"></i>
                <span className="badge-sonar"></span>
              </Link>
              <Link
                onClick={this.onLogoutHandler.bind(this)}
                to="#"
                className="tooltip-test"
                data-toggle="tooltip"
                data-placement="top"
                title="Logout"
              >
                <i className="fa fa-power-off" />
              </Link>
            </div>
          </nav>
          {/*-- sidebar-wrapper  -*/}
          <main className="page-content">
            <div className="">{this.props.children}</div>
          </main>
          {/*-- Page Content  -*/}
        </div>
      </div>
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
