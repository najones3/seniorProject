import React, { useEffect, useState, useRef } from "react";
import { Card, ListGroup, Form, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase.js";

export default function Profile() {
  const { currentUser } = useAuth();
  const [tutors, setTutorArray] = useState([]);
  const [requests, setReqArray] = useState([]);
  const [didLoad, setDidLoad] = useState(false);
  const option = useRef("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("none");
  const tutorRef = db.collection("tutor");
  const tutoringReqRef = db.collection("tutoringReq");

  useEffect(() => {
    if (!didLoad) {
      tutoringReqRef.get().then((snap) => {
        snap.forEach((doc) => {
          let docData;
          let id = doc.id;
          docData = doc.data();
          docData.id = id;
          if (currentUser.displayName === docData.name) {
            setReqArray((arr) => [...arr, docData]);
          }
        });
      });
      tutorRef.get().then((snap) => {
        snap.forEach((doc) => {
          let docData;
          let id = doc.id;
          docData = doc.data();
          docData.id = id;
          if (currentUser.displayName === docData.name) {
            setTutorArray((arr) => [...arr, docData]);
          }
        });
      });
      setDidLoad(true);
    }
  }, [didLoad, tutorRef, tutoringReqRef, currentUser]);

  function RequestList() {
    return (
      <ListGroup style={{ display: first }}>
        {requests.map((doc, i) => (
          <ListGroup.Item key={doc.id}>
            <strong>Name: </strong> {doc.name + " "}
            <strong>Course: </strong> {doc.course + " "}
            <strong>Discription: </strong> {doc.desc + " "}
            <Button
              style={{ float: "right" }}
              className="btn btn-primary"
              onClick={() => {
                if (window.confirm("Click OK to delete listing")) {
                  deleteListing(i, doc.id, "request");
                }
              }}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }

  function TutorList() {
    return (
      <ListGroup style={{ display: second }}>
        {tutors.map((doc, i) => (
          <ListGroup.Item key={doc.id}>
            <strong>Name: </strong> {doc.name + " "}
            <strong>Course: </strong> {doc.course + " "}
            <strong>Discription: </strong> {doc.desc + " "}
            <Button
              style={{ float: "right" }}
              className="btn btn-primary"
              onClick={() => {
                if (window.confirm("Click OK to delete listing")) {
                  deleteListing(i, doc.id, "tutors");
                }
              }}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }

  function deleteListing(i, id, type) {
    if (type === "request") {
      console.log("here");
      var array = [...requests];
      let temp = array[i];
      console.log(temp);
      if (i !== -1) {
        array.splice(i, 1);
        setReqArray(array);
      }
      tutoringReqRef
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    } else {
      var array2 = [...tutors];
      let temp2 = array2[i];
      console.log(temp2);
      if (i !== -1) {
        array2.splice(i, 1);
        setTutorArray(array2);
      }
      tutorRef
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    }
  }

  function NoTutorListing() {
    if (tutors.length === 0 && second === "") {
      return <h4>No Listings</h4>;
    } else {
      return <></>;
    }
  }

  function NoRequestListing() {
    if (requests.length === 0 && first === "") {
      return <h4>No Listings</h4>;
    } else {
      return <></>;
    }
  }

  return (
    <div className="mx-auto">
      <Card>
        <Card.Header>
          <h2 className="text-center">Profile</h2>
        </Card.Header>
        <Card.Body>
          <h4>Account Info</h4>
          <br />
          <strong>Name:</strong> {currentUser.displayName}
          <br />
          <strong>Email:</strong> {currentUser.email}
          <br />
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group controlId="selectForm">
              <Form.Label>
                <strong>My Listings</strong>
              </Form.Label>
              <Form.Control
                as="select"
                ref={option}
                onChange={() => {
                  setFirst("none");
                  setSecond("none");
                  if (option.current.value === "Tutoring Request") {
                    setFirst("");
                  }
                  if (option.current.value === "Tutor Listing") {
                    setSecond("");
                  }
                }}
              >
                <option value="Tutoring Request">Tutoring Request</option>
                <option value="Tutor Listing">Tutor Listing</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <TutorList />
          <RequestList />
          <br />
          <NoRequestListing />
          <NoTutorListing />
        </Card.Body>
      </Card>
    </div>
  );
}
