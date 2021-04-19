import React, { useEffect, useState } from "react";
import { ListGroup, Button, Card } from "react-bootstrap";
import { db } from "../firebase.js";
import SearchBar from "./Search";
import { useAuth } from "../contexts/AuthContext";

export default function Browse() {
  const [input, setInput] = useState("");
  const [arrayItems, setArray] = useState([]);
  const [show, setShow] = useState([]);
  const [didLoad, setDidLoad] = useState(false);
  const tutorRef = db.collection("tutor");
  const match = db.collection("match");
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!didLoad) {
      tutorRef.get().then((snap) => {
        snap.forEach((doc) => {
          let docData;
          let id = doc.id;
          docData = doc.data();
          docData.id = id;
          if (currentUser.displayName !== docData.name) {
            setArray((arr) => [...arr, docData]);
            setShow((arr) => [...arr, docData]);
          }
        });
      });

      setDidLoad(true);
    }
  }, [currentUser.displayName, didLoad, tutorRef]);

  const updateInput = async (input) => {
    let filtered = JSON.parse(JSON.stringify(arrayItems));

    filtered = filtered.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setShow(filtered);
  };

  const removeHandler = (i, id) => {
    var array = [...arrayItems];
    let temp = array[i];
    console.log(temp);
    if (i !== -1) {
      array.splice(i, 1);
      setShow(array);
    }
    tutorRef
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        temp.match = true;
        temp.matchWith = currentUser.email;
        console.log(temp);
        match
          .add(temp)
          .then(() => {
            console.log("Match document successfully added!");
          })
          .catch((error) => {
            console.error("Error removing match document: ", error);
          });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  function NoListing() {
    if (show.length === 0) {
      return <h4>No Listings</h4>;
    } else {
      return <></>;
    }
  }

  return (
    <div className="mx-auto">
      <Card>
        <Card.Header>
          <h3 className="text-center">Available Tutors</h3>
        </Card.Header>
        <Card.Body>
          <SearchBar input={input} onChange={updateInput} />

          <ListGroup>
            {show.map((doc, i) => (
              <ListGroup.Item key={doc.id}>
                Name: {doc.name}
                <br />
                Course: {doc.course}
                <br />
                Discription: {doc.desc}
                <br />
                <Button
                  className="btn btn-primary"
                  onClick={() => {
                    removeHandler(i, doc.id);
                  }}
                >
                  Tute
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <br />
          <NoListing />
        </Card.Body>
      </Card>
    </div>
  );
}
