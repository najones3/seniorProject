import React, { useEffect, useState } from "react";
import { Nav, Form, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { db } from "../firebase.js";

export default function NavBar() {
  const [display, setDisplay] = useState("none");
  const { logout } = useAuth();
  const history = useHistory();
  const users = db.collection("users");
  const [didLoad, setDidLoad] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!didLoad && currentUser) {
      users.get().then((snap) => {
        snap.forEach((doc) => {
          let docData;
          docData = doc.data();
          if (currentUser.email === docData.email && docData.isAdmin === true) {
            setDisplay("");
          }
        });
      });

      setDidLoad(true);
    }
  }, [currentUser, didLoad, users]);

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("Failed to log out");
    }
  }
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="./Browse">Tutes</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="./Browse">Browse</Nav.Link>
        <Nav.Link href="./Tutors"> Tutors</Nav.Link>
        <Nav.Link href="./Create">Create</Nav.Link>
        <Nav.Link href="./Match">Match</Nav.Link>
        <Nav.Link href="./profile">Profile</Nav.Link>
        <NavDropdown
          title="Admin"
          id="basic-nav-dropdown"
          style={{ display: display }}
        >
          <NavDropdown.Item href="./manage">Manange Listings</NavDropdown.Item>
          <NavDropdown.Item href="./grant-access">
            Grant Access
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Form inline>
        <Button variant="outline-light" onClick={handleLogout}>
          Logout
        </Button>
      </Form>
    </Navbar>
  );
}
