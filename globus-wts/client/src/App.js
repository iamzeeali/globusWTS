import React, { Fragment } from "react";
import "./App.css";

//Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
// Redux
import { Provider } from "react-redux";
import store from "./store";

import Alert from "./components/UI/Alert";
import Sidebar from "./components/UI/sidebar/Sidebar";
import Landing from "./components/UI/Landing";
import Login from "./components/auth/Login";
import Dashboard from "./components/Dashboard";

import StateMaster from "./components/location/StateMaster";
import AddState from "./components/location/AddState";
import EditState from "./components/location/EditState";

import CityMaster from "./components/location/CityMaster";
import AddCity from "./components/location/AddCity";
import EditCity from "./components/location/EditCity";

import LocationMaster from "./components/location/LocationMaster";
import AddLocation from "./components/location/AddLocation";
import EditLocation from "./components/location/EditLocation";

const App = () => {
  let routes = (
    <Fragment>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>

      <Switch>
        <PrivateRoute
          exact
          path="/location/statemaster"
          component={StateMaster}
        />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/location/addState" component={AddState} />
      </Switch>
      <Switch>
        <PrivateRoute exact path={`/editState/:id`} component={EditState} />
      </Switch>

      <Switch>
        <PrivateRoute
          exact
          path="/location/citymaster"
          component={CityMaster}
        />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/location/addCity" component={AddCity} />
      </Switch>
      <Switch>
        <PrivateRoute exact path={`/editCity/:id`} component={EditCity} />
      </Switch>

      <Switch>
        <PrivateRoute
          exact
          path="/location/locationmaster"
          component={LocationMaster}
        />
      </Switch>
      <Switch>
        <PrivateRoute
          exact
          path="/location/addLocation"
          component={AddLocation}
        />
      </Switch>
      <Switch>
        <PrivateRoute
          exact
          path={`/editLocation/:id`}
          component={EditLocation}
        />
      </Switch>
    </Fragment>
  );

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <Sidebar>{routes}</Sidebar>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
