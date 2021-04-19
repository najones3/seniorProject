import React, { useEffect, useState } from "react";
import { ListGroup, Button, Card } from "react-bootstrap";
import { db } from "../firebase.js";
import SearchBar from "./Search";
import { useAuth } from "../contexts/AuthContext";

export default function GrantAccess() {
  const users = db.collection("users");
  const [show, setShow] = useState([]);
  const [input, setInput] = useState("");
  const [arrayItems, setArray] = useState([]);
  const [didLoad, setDidLoad] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!didLoad) {
      users.get().then((snap) => {
        snap.forEach((doc) => {
          let docData;
          let id = doc.id;
          docData = doc.data();
          docData.id = id;
          if (docData.email !== currentUser.email) {
            setShow((arr) => [...arr, docData]);
            setArray((arr) => [...arr, docData]);
          }
        });
      });

      setDidLoad(true);
    }
  }, [didLoad, users, currentUser]);

  const updateInput = async (input) => {
    let filtered = JSON.parse(JSON.stringify(arrayItems));

    filtered = filtered.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setShow(filtered);
  };

  function grant(i, id) {
    users.doc(id).update({ isAdmin: true });
  }

  return (
    <div className="mx-auto">
      <Card>
        <Card.Header>
          <h2 className="text-center"> Grant Admin Access</h2>
        </Card.Header>
        <Card.Body>
          <SearchBar input={input} onChange={updateInput} />

          <ListGroup>
            {show.map((doc, i) => (
              <ListGroup.Item key={doc.email}>
                <strong>Name: </strong> {doc.name + " "}
                <br />
                <strong>Course: </strong> {doc.course + " "}
                <br />
                <strong>Admin: </strong> {doc.isAdmin + " "}
                <Button
                  style={{ float: "right" }}
                  className="btn btn-primary"
                  onClick={() => {
                    if (window.confirm("Click OK to grant admin access.")) {
                      grant(i, doc.id);
                    }
                  }}
                >
                  Grant Admin Access
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}
