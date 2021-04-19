import React, { useRef } from "react";
import { Form, Button, Col, Row, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase.js";

export default function Create() {
  const { currentUser } = useAuth();
  const tutoringReqRef = db.collection("tutoringReq");
  const tutorRef = db.collection("tutor");
  const courseRef = useRef();
  const descRef = useRef();
  const listType = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (listType.current.value === "Tutor Listing") {
      tutorRef
        .add({
          name: currentUser.displayName,
          email: currentUser.email,
          course: courseRef.current.value,
          desc: descRef.current.value,
          match: false,
        })
        .then((docRef) => {
          alert("Request Added!");
          window.location.reload();
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      tutoringReqRef
        .add({
          name: currentUser.displayName,
          email: currentUser.email,
          course: courseRef.current.value,
          desc: descRef.current.value,
          match: false,
        })
        .then((docRef) => {
          alert("Request Added!");
          window.location.reload();
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  };

  return (
    <div className="mx-auto">
      <Card>
        <Card.Header>
          <h3 className="text-center">Create Listing</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>
                <strong>Listing Type:</strong>
              </Form.Label>
              <Form.Control as="select" ref={listType} required>
                <option>Tutoring Request</option>
                <option>Tutor Listing</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                <strong>Email:</strong>
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={currentUser.email}
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <strong>Course/Subject Matter:</strong>
              </Form.Label>
              <Form.Control
                type="text"
                ref={courseRef}
                placeholder="Enter coarse"
                maxLength="40"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <strong>Description:</strong>
              </Form.Label>
              <Form.Control
                type="text"
                ref={descRef}
                placeholder="Enter description"
                maxLength="250"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
