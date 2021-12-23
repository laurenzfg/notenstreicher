import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Grade = () => {
  return (
    <Col className="ml-2 mr-2 mb-2" key="AfI">
      <Form>
        <Row>
          <Col className="mb-2 col-md-7 col-12">
            <Form.Control placeholder="Module Name" />
          </Col>
          <Col className="mb-2 col-md-2 col-12">
            <Form.Control placeholder="Module ECTS" />
          </Col>
          <Col className="mb-2 col-md-2 col-12">
            <Form.Control placeholder="Your Grade" />
          </Col>
          <Col className="mb-2 col-md-1 col-12">
            <Button variant="danger">Remove</Button>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default Grade;
