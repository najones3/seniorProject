import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { db } from "../firebase.js";
import SearchBar from "./Search";
import { useAuth } from "../contexts/AuthContext";

export default function Match() {
  const [input, setInput] = useState("");
  const [arrayItems, setArray] = useState([]);
  const [fromArray, setFromArray] = useState([]);
  const [didLoad, setDidLoad] = useState(false);
  const { currentUser } = useAuth();
  const tutoringReqRef = db.collection("tutoringReq");

  let docData;

  useEffect(() => {
    if (!didLoad) {
      tutoringReqRef.get().then((snap) => {
        snap.forEach((doc) => {
          let id = doc.id;
          docData = doc.data();
          docData.id = id;
          setArray((arr) => [...arr, docData]);
          if (currentUser.displayName !== docData.name) {
            setFromArray((old) => [...old, docData]);
          }
        });
      });

      setDidLoad(true);
    }
  }, [arrayItems]);

  const updateInput = async (input) => {
    const filtered = arrayItems.filter((item) => {
      return item.course.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setArray(filtered);
  };
  return (
    <div>
      <div className="mx-auto">
        <SearchBar input={input} onChange={updateInput} />

        <ListGroup>
          {fromArray.map((doc, i) => (
            <ListGroup.Item key={doc.id}>
              {"Name: " + doc.name}
              <br />
              {"Coarse: " + doc.course}
              <br />
              {"Discription: " + doc.desc}
              <br />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
