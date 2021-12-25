import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Grade = ({ grade, updateGrade, removeGrade }) => {
  
  const handleGradeNameUpdate = (event) => {
    let updatedGrade = { ...grade };
    updatedGrade.name = event.target.value;
    updateGrade(updatedGrade);
  };

  const handleGradeEctsUpdate = (event) => {
    let updatedGrade = { ...grade };
    updatedGrade.ects = event.target.value;
    updateGrade(updatedGrade); 
  };

  const handleGradeGradeUpdate = (event) => {
    let updatedGrade = { ...grade };
    updatedGrade.grade = event.target.value;
    updateGrade(updatedGrade);  
  };

  return (
    <Col className="ml-2 mr-2 mb-2">
      <Form>
        <Row>
          <Col className="mb-2 col-md-7 col-12">
            <Form.Control value={grade.name} onChange={handleGradeNameUpdate} placeholder="Module Name" />
          </Col>
          <Col className="mb-2 col-md-2 col-12">
            <Form.Control value={grade.ects} onChange={handleGradeEctsUpdate} placeholder="Module ECTS" isInvalid={isNaN(grade.ects) || String(grade.ects).includes(".")} />
          </Col>
          <Col className="mb-2 col-md-2 col-12">
            <Form.Control value={grade.grade} onChange={handleGradeGradeUpdate} placeholder="Your Grade" isInvalid={isNaN(grade.grade)}/>
          </Col>
          <Col className="mb-2 col-md-1 col-12">
            <Button variant="danger" onClick={removeGrade}>Remove</Button>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default Grade;
