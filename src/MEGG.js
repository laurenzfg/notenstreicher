import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Grade from "./Grade";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MEGGDisplay = ({ gradeArea, updateGradeArea, removeGradeArea }) => {
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
      updatedGradeArea.grades = [...updatedGradeArea.grades];
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
      <div className="grade-area-container">
        <div className="grade-area-tr">
          <Button variant="white" className="flex-shrink-0 flex-grow-1 flex-sm-grow-0" onClick={removeGradeArea}>
            <FontAwesomeIcon className="is-danger" size="lg" icon={faTrash} />
          </Button>
        </div>
        <Col className="mb-4 col-11 col-md-6 col-lg-5">
          <Form>
            <Form.Control
              value={gradeArea.name}
              placeholder="Module Area Name"
              onChange={handleAreaNameUpdate}
            />
          </Form>
        </Col>

        <Row sm={1}>
          <Col className="ml-2 mr-2" key="AfI">
            <Row>
              <Col className="mb-2 col-md-7 col-12">Module Name</Col>
              <Col className="mb-2 col-md-2 col-12">Module ECTS</Col>
              <Col className="mb-2 col-md-2 col-12">Your Grade</Col>
            </Row>
          </Col>
          <Col className="ml-2 mr-2 mb-1" >
            <Button variant="white" className="ps-0 flex-shrink-0 flex-grow-1 flex-sm-grow-0 is-success d-flex align-items-center gap-2" onClick={addGrade}>
              <FontAwesomeIcon icon={faPlus} />
              <span>Add Module</span>
            </Button>
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
      </div>
    </>
  );
};

export default MEGGDisplay;
