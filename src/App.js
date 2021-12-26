import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import MEGGDisplay from "./MEGG";

import "./App.css";

const initialTranscript = JSON.parse(
  '{"meggs":[{"name":"PraktischeInformatik","grades":[{"name":"Programmierung","grade":"2","ects":"8"},{"name":"DSAL","grade":"2","ects":"8"},{"name":"Datenbanken","grade":"2","ects":"6"},{"name":"SWT","grade":"2","ects":"6"}]},{"name":"TechnischeInformatik","grades":[{"name":"TI","grade":"2","ects":"6"},{"name":"BUS","grade":"2","ects":"6"},{"name":"Datkom","grade":"2","ects":"6"}]},{"name":"TheoretischeInformatik","grades":[{"name":"Fosap","grade":"2","ects":"6"},{"name":"BuK","grade":"2","ects":"7"},{"name":"Malo","grade":"4","ects":"7"}]},{"name":"Mathematik","grades":[{"name":"DS","grade":"2","ects":"6"},{"name":"AfI","grade":"2","ects":"8"},{"name":"LA","grade":"2","ects":"6"},{"name":"Stocha","grade":"2","ects":"6"}]},{"name":"Sonstiges","grades":[{"name":"Proseminar","grade":"2","ects":"3"},{"name":"Praktikum","grade":"2","ects":"6"},{"name":"Seminar","grade":"2","ects":"5"}]},{"name":"Wahlpflicht","grades":[{"name":"DPN","grade":"2","ects":"6"},{"name":"AI","grade":"2","ects":"6"},{"name":"Compilerbau","grade":"2","ects":"6"}]},{"name":"Anwendungsfach","grades":[{"name":"NumA1","grade":"2","ects":"6"},{"name":"MathePraktikum","grade":"2","ects":"6"},{"name":"Cobra","grade":"2","ects":"10"}]}]}'
);

const App = () => {
  const [transcript, updateTranscript] = useState(initialTranscript);

  // for the result modal
  const [show, setShow] = useState(false);
  const [cancellationRecommendation, setCancellationRecommendation] =
    useState("");
  const handleClose = () => setShow(false);

  const addCategory = () => {
    const emptyCategory = {
      name: "",
      grades: [],
    };

    let transcriptWithAddedCategory = {
      meggs: [emptyCategory, ...transcript.meggs],
    };

    updateTranscript(transcriptWithAddedCategory);

    console.log(transcript);
  };

  const resetForm = () => {
    updateTranscript(initialTranscript);
  };

  const updateGradeArea = (i) => {
    return (updatedCategory) => {
      let transcriptWithUpdatedCategory = { meggs: [...transcript.meggs] };
      transcriptWithUpdatedCategory.meggs[i] = updatedCategory;
      updateTranscript(transcriptWithUpdatedCategory);
    };
  };

  const removeGradeArea = (i) => {
    return () => {
      let transcriptWithUpdatedCategory = { meggs: [...transcript.meggs] };
      let firstItems = transcriptWithUpdatedCategory.meggs.slice(0, i);
      let lastItems = transcriptWithUpdatedCategory.meggs.slice(
        i + 1,
        transcriptWithUpdatedCategory.meggs.length
      );
      transcriptWithUpdatedCategory.meggs = firstItems.concat(lastItems);
      updateTranscript(transcriptWithUpdatedCategory);
    };
  };

  const onCalculate = () => {
    setCancellationRecommendation(JSON.stringify(transcript));
    setShow(true);
  };

  return (
    <>
      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <h1 className="header mb-4">
            Notenstreicher
            <Button variant="primary" className="ms-3" onClick={onCalculate}>
              Calculate
            </Button>
            <Button variant="success" className="ms-3" onClick={addCategory}>
              Add Grade Area
            </Button>
            <Button variant="secondary" className="ms-3" onClick={resetForm}>
              Reset Form
            </Button>
          </h1>
          <hr />
          {transcript.meggs.map((gradeArea, i) => (
            <MEGGDisplay
              key={i}
              gradeArea={gradeArea}
              updateGradeArea={updateGradeArea(i)}
              removeGradeArea={removeGradeArea(i)}
            />
          ))}
        </Container>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Grade Cancellation Recommendation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{cancellationRecommendation}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default App;
