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
    const transcriptAsJSON = JSON.stringify(transcript);

    let cancellationRecommendation = "pending result";
    try {
      // Call Golang
      cancellationRecommendation = window.notenstreicher(transcriptAsJSON);
    } catch (e) {
      cancellationRecommendation = e;
    }

    setCancellationRecommendation(cancellationRecommendation);
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
          <p>
            (c) 2021 <a href="https://laurenzfg.com">laurenzfg</a>. Source code
            is published at{" "}
            <a href="https://github.com/laurenzfg/notenstreicher">GitHub</a>.<br />
            Data Protection Statement: The data processing happens on your machine.
            So the data created while using the app (e.g. your grades) is not sent to any party, including me.
            Your access to the service might be logged and might be processed in adherence to EU and US law by my hosting provider GitHub Pages, though.
            "Please note that GitHub may collect User Personal Information from visitors to your GitHub Pages website, including logs of visitor IP addresses, to comply with legal obligations, and to maintain the security and integrity of the Website and the Service."
          </p>
        </Container>
      </Container>
      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Grade Cancellation Recommendation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Result of{" "}
            <a href="https://github.com/laurenzfg/notenstreicher/tree/main/GoKernel">
              my Golang tool
            </a>{" "}
            to compute the optimal grade cancellation:
          </p>
          <pre>{cancellationRecommendation}</pre>
          <p>
            You just invoked a CLI tool written in Golang with your browser. It
            was run as a <a href="https://webassembly.org/">WebAssembly</a> on your machine! Pretty cool, eh.
          </p>
        </Modal.Body>
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
