import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Grade from "./Grade";

const MEGGDisplay = ({
  gradeArea,
  updateGradeArea,
  removeGradeArea,
}) => {
  const addGrade = () => {
    const emptyGrade = {
      name: "",
      ects: 0,
      grade: 0.0,
    };
    let updatedGradeArea = { ...gradeArea };
    updatedGradeArea.grades = [emptyGrade, ...gradeArea.grades];

    updateGradeArea(updatedGradeArea);
  };

  const updateGrade = (i) => {
    return (updatedGrade) => {
      let updatedGradeArea = { ...gradeArea };
      updatedGradeArea.grades = [...updatedGradeArea.grades]
      updatedGradeArea.grades[i] = updatedGrade;
      updateGradeArea(updatedGradeArea);
    };
  };

  const removeGrade = (i) => {
    return (updatedGrade) => {
      let updatedGradeArea = { ...gradeArea };
      let firstItems = updatedGradeArea.grades.slice(0, i);
      let lastItems = updatedGradeArea.grades.slice(
        i + 1,
        updatedGradeArea.grades.length
      );
      updatedGradeArea.grades = firstItems.concat(lastItems);
      updateGradeArea(updatedGradeArea);
    };
  };

  const handleAreaNameUpdate = (event) => {
    let updatedGradeArea = { ...gradeArea };
    updatedGradeArea.name = event.target.value;
    updateGradeArea(updatedGradeArea);
  };

  return (
    <>
      <Col className="mt-4 mb-4 col-xl-7 col-12">
        <Form>
          <Row>
            <Col className="col-6">
              <Form.Control
                value={gradeArea.name}
                placeholder="Module Area Name"
                onChange={handleAreaNameUpdate}
              />
            </Col>
            <Col className="col-6">
              <Button variant="success" className="me-2" onClick={addGrade}>
                Add Grade
              </Button>{" "}
              <Button variant="danger" className="" onClick={removeGradeArea}>
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
          <Grade
            grade={grade}
            key={i}
            updateGrade={updateGrade(i)}
            removeGrade={removeGrade(i)}
          />
        ))}
      </Row>
      <hr />
    </>
  );
};

export default MEGGDisplay;
