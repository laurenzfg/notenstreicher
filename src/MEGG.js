import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Grade from "./Grade";

const MEGGDisplay = ({ gradeArea, gradeAreaKey }) => {
  return (
    <>
      <Col className="mt-4 mb-4 col-7">
        <Form>
          <Row>
            <Col className="col-6">
              <Form.Control
                value={gradeArea.name}
                placeholder="Module Area Name"
              />
            </Col>
            <Col className="col-6">
              <Button variant="success" className="me-2">
                Add Grade
              </Button>{" "}
              <Button variant="danger" className="">
                Remove Grade Area
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>

      <Row className="col-10" sm={1}>
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
