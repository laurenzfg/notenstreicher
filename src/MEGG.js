import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Grade from "./Grade";

const MEGGDisplay = ({ gradeArea, gradeAreaKey }) => {
  return (
    <>
      <h2 className="mt-4 mb-4">
        {gradeArea.name}
        <Button variant="success" className="ms-3">
          Add Grade
        </Button>
        <Button variant="danger" className="ms-3">
          Remove Grade Area
        </Button>
      </h2>

      <Row className="col-md-10" sm={1}>
        <Col className="ml-2 mr-2 mb-2" key="AfI">
          <Row>
            <Col className="mb-2 col-md-7 col-12">Module Name</Col>
            <Col className="mb-2 col-md-2 col-12">Module ECTS</Col>
            <Col className="mb-2 col-md-2 col-12">Your Grade</Col>
          </Row>
        </Col>
        {gradeArea.grades.map((grade, i) => (
          <Grade grade={grade} gradeAreaKey={gradeAreaKey} gradeKey={i} />
        ))}
      </Row>
    </>
  );
};

export default MEGGDisplay;
