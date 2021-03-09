import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { db } from "../firebase.js";

export default function Browse() {
  const tutoringReqRef = db.collection("tutoringReq");
  let docData;
  let docsArray = [];
  let returnDocs = [];

  //   function getListData() {
  //     tutoringReqRef.get().then((snap) => {
  //       snap.forEach((doc) => {
  //         docData = doc.data();
  //         console.log(docData.name);
  //         // docsArray.push(docData.name);
  //         setdocsArray([docData.name, ...docsArray]);
  //       });
  //       //   setReturnDocs(docsArray);
  //     });
  //   }
  useEffect(() => {
    tutoringReqRef
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          docData = doc.data();
          console.log(docData.name);
          // docsArray.push(docData.name);
          docsArray.push(docData.name);
        });
      })
      .then(() => {
        // setReturnDocs(docsArray);
        console.log("This is docsA " + docsArray);
      });
  }, []);
  useEffect(() => {
    returnDocs = docsArray;
  }, [docsArray]);
  //   getListData();

  return (
    <div className="mx-auto">
      <ListGroup>
        {/* {docsArray.map((doc, i) => {
          //   <ListGroup.Item key={i}>{doc}</ListGroup.Item>;
        //   <h1>{doc.name}</h1>;
        })} */}
        <h1>{"help"}</h1>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </div>
  );
}
