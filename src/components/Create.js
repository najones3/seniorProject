import React, { useRef } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase.js";

export default function Create() {
  const { currentUser } = useAuth();
  const tutoringReqRef = db.collection("tutoringReq");
  const courseRef = useRef();
  const descRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    tutoringReqRef
      .add({
        name: currentUser.displayName,
        email: currentUser.email,
        course: courseRef.current.value,
        desc: descRef.current.value,
        match: false,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div className="mx-auto">
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={currentUser.email} />
          </Col>
        </Form.Group>
        <Form.Group>
          <Form.Label>Course</Form.Label>
          <Form.Control
            type="text"
            ref={courseRef}
            placeholder="Enter coarse"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            ref={descRef}
            placeholder="Enter description"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
