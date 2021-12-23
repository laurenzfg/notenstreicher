import React from "react";

import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import Grade from "./Grade";

const MEGGDisplay = ({title}) => {

  return (
    <>
      <h2 className="mt-4 mb-4">
        {title}
        <Button variant="success" className="ms-3">Add Grade</Button>
        <Button variant="danger" className="ms-3">Remove Grade Area</Button>
      </h2>

      <Row className="col-md-10" sm={1}>
        <Grade name="AfI" ects={8} grade={1.3} />
        <Grade name="AfI" ects={8} grade={1.3} />
        <Grade name="AfI" ects={8} grade={1.3} />
        <Grade name="AfI" ects={8} grade={1.3} />
      </Row>
    </>
  );
};

export default MEGGDisplay;
