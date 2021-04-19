import React from "react";
import Signup from "./Signup";
// import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./Profile";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ForgotPassword from "./ForgotPassword";
import Browse from "./Browse";
import NavBar from "./NavBar";
import Create from "./Create";
import Match from "./Match";
import Tutors from "./Tutors";
import GrantAccess from "./GrantAccess";
import ManageListings from "./ManageListings";

function App() {
  return (
    <AuthProvider>
      {/* <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      > */}
      <div className="w-100" style={{ width: "100%" }}>
        <Router>
          <NavBar component={NavBar} />
          <Switch>
            <PrivateRoute exact path="/" component={Browse} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute path="/Create" component={Create} />
            <PrivateRoute path="/browse" component={Browse} />
            <PrivateRoute path="/match" component={Match} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/tutors" component={Tutors} />
            <AdminRoute path="/grant-access" component={GrantAccess} />
            <AdminRoute path="/manage" component={ManageListings} />
          </Switch>
        </Router>
      </div>
      {/* </Container> */}
    </AuthProvider>
  );
}

export default App;
