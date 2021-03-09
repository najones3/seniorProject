import React from "react";
import { Nav, Form, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function NavBar() {
  const { logout } = useAuth();
  const history = useHistory();

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
      <Navbar.Brand href="#home">Tutes</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="./Browse">Browse</Nav.Link>
        <Nav.Link href="./Create">Create</Nav.Link>
        <Nav.Link href="./Dashboard">Profile</Nav.Link>
      </Nav>
      <Form inline>
        <Button variant="outline-light" onClick={handleLogout}>
          Logout
        </Button>
      </Form>
    </Navbar>
  );
}
