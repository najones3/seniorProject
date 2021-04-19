import React, { useEffect, useState } from "react";
import { ListGroup, Card } from "react-bootstrap";
import { db } from "../firebase.js";
import SearchBar from "./Search";
import { useAuth } from "../contexts/AuthContext";

export default function Match() {
  const [input, setInput] = useState("");
  const [arrayItems, setArray] = useState([]);
  const [fromArray, setFromArray] = useState([]);
  const [didLoad, setDidLoad] = useState(false);
  const { currentUser } = useAuth();
  const matchRef = db.collection("match");

  useEffect(() => {
    if (!didLoad) {
      matchRef.get().then((snap) => {
        snap.forEach((doc) => {
          let docData;
          let id = doc.id;
          docData = doc.data();
          docData.id = id;
          setArray((arr) => [...arr, docData]);
          if (
            currentUser.displayName !== docData.name &&
            docData.match === true &&
            docData.matchWith === currentUser.email
          ) {
            setFromArray((old) => [...old, docData]);
          }
        });
      });

      setDidLoad(true);
    }
  }, [arrayItems, currentUser, didLoad, matchRef]);

  const updateInput = async (input) => {
    let filtered = JSON.parse(JSON.stringify(fromArray));

    filtered = filtered.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setFromArray(filtered);
  };

  function NoListing() {
    if (fromArray.length === 0) {
      return <h4>No Listings</h4>;
    } else {
      return <></>;
    }
  }

  return (
    <div className="mx-auto">
      <Card>
        <Card.Header>
          <h3 className="text-center">My Matches</h3>
        </Card.Header>
        <Card.Body>
          <SearchBar input={input} onChange={updateInput} />
          <ListGroup>
            {fromArray.map((doc, i) => (
              <ListGroup.Item key={doc.id}>
                Name: {doc.name}
                <br />
                Course: {doc.course}
                <br />
                Discription: {doc.desc}
                <br />
                <strong>Contact: </strong> {doc.email}
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
