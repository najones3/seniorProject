import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Card, ListGroup } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase.js";
import SearchBar from "./Search";

export default function ManageListings() {
  const { currentUser } = useAuth();
  const [tutors, setTutorArray] = useState([]);
  const [requests, setReqArray] = useState([]);
  const [didLoad, setDidLoad] = useState(false);
  const [input, setInput] = useState("");
  const [show, setShow] = useState([]);
  const [show2, setShow2] = useState([]);
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
          setReqArray((arr) => [...arr, docData]);
          setShow((arr) => [...arr, docData]);
        });
      });
      tutorRef.get().then((snap) => {
        snap.forEach((doc) => {
          let docData;
          let id = doc.id;
          docData = doc.data();
          docData.id = id;
          setTutorArray((arr) => [...arr, docData]);
          setShow2((arr) => [...arr, docData]);
        });
      });
      setDidLoad(true);
    }
  }, [didLoad, tutorRef, tutoringReqRef, currentUser]);

  function RequestList() {
    return (
      <ListGroup style={{ display: first }}>
        {show.map((doc, i) => (
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
        {show2.map((doc, i) => (
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
        setShow(array);
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
        setShow2(array2);
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

  const updateInput = async (input) => {
    if (first === "") {
      let filtered = JSON.parse(JSON.stringify(requests));

      filtered = filtered.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(input.toLowerCase());
      });
      setInput(input);
      setShow(filtered);
    } else if (second === "") {
      let filtered = JSON.parse(JSON.stringify(tutors));

      filtered = filtered.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(input.toLowerCase());
      });
      setInput(input);
      setShow2(filtered);
    }
  };

  return (
    <div className="mx-auto">
      <Card>
        <Card.Header className="text-center">
          <h2>Manage Listings</h2>
        </Card.Header>
        <Card.Body>
          <SearchBar input={input} onChange={updateInput} />
          <Form>
            <Form.Group controlId="selectForm">
              <Form.Label>
                <strong>Listing Type:</strong>
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
        </Card.Body>
      </Card>
    </div>
  );
}
