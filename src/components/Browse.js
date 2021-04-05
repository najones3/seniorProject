import React, { useEffect, useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { db } from "../firebase.js";
import SearchBar from "./Search";

export default function Browse() {
  const [input, setInput] = useState("");
  const [arrayItems, setArray] = useState([]);
  const [showItems, setShowArray] = useState([]);

  const [didLoad, setDidLoad] = useState(false);
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
        });
      });
      setDidLoad(true);
    }
  }, []);

  const updateInput = async (input) => {
    const filtered = arrayItems.filter((item) => {
      return item.course.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setArray(filtered);
  };

  const removeHandler = (i, id) => {
    var array = [...arrayItems];
    if (i !== -1) {
      array.splice(i, 1);
      setArray(array);
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
  };

  return (
    <div className="mx-auto">
      <SearchBar input={input} onChange={updateInput} />

      <ListGroup>
        {arrayItems.map((doc, i) => (
          <ListGroup.Item key={doc.id}>
            {"Name: " + doc.name}
            <br />
            {"Coarse: " + doc.course}
            <br />
            {"Discription: " + doc.desc}
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
    </div>
  );
}
