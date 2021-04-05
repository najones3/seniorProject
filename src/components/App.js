import React from "react";
import Signup from "./Signup";
// import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import Browse from "./Browse";
import NavBar from "./NavBar";
import Create from "./Create";
import Match from "./Match";

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
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/Create" component={Create} />
            <Route path="/browse" component={Browse} />
            <Route path="/match" component={Match} />
          </Switch>
        </Router>
      </div>
      {/* </Container> */}
    </AuthProvider>
  );
}

export default App;
