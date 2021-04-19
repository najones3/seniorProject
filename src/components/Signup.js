import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase.js";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const users = db.collection("users");

  async function handleSubmit(e) {
    e.preventDefault();

    const capitalize = (s) => {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    };

    const fnameTest = /^[a-z ,.'-]+$/i.test(firstNameRef.current.value);
    const lnameTest = /^[a-z ,.'-]+$/i.test(lastNameRef.current.value);
    if (firstNameRef.current.value && fnameTest === true) {
      firstNameRef.current.value = capitalize(firstNameRef.current.value);
      console.log(firstNameRef.current.value);
    } else {
      return setError("Avoid special characters in name fields.");
    }

    if (lastNameRef.current.value && lnameTest === true) {
      lastNameRef.current.value = capitalize(lastNameRef.current.value);
      console.log(lastNameRef.current.value);
    } else {
      return setError("Avoid special characters in name fields.");
    }

    const res = /.+@((?:go|cs)\.)?olemiss\.edu$/.test(emailRef.current.value);
    // const res = /.+@(go\.)?olemiss\.edu$/.test(emailRef.current.value);
    if (!res) {
      return setError("Email not university format!");
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do no match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value)
        .then(function (result) {
          return result.user.updateProfile({
            displayName:
              firstNameRef.current.value + " " + lastNameRef.current.value,
          });
        })
        .then(() => {
          users
            .add({
              email: emailRef.current.value,
              isAdmin: false,
              name:
                firstNameRef.current.value + " " + lastNameRef.current.value,
            })
            .then((doc) => {
              console.log("User was added");
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
      // users
      //   .add({
      //     email: currentUser.email,
      //     isAdmin: false,
      //     name: currentUser.displayName,
      //   })
      //   .then((doc) => {
      //     console.log("User was added");
      //   })
      //   .catch((error) => {
      //     console.error("Error adding document: ", error);
      //   });
      history.push("/browse");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <Container>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" ref={firstNameRef} required />
            </Form.Group>
            <Form.Group id="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" ref={lastNameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="login">Log In</Link>
      </div>
    </Container>
  );
};

export default Signup;
