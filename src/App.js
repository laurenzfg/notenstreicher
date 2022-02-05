import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import MEGGDisplay from "./MEGG";

import "./App.css";

const initialTranscript = JSON.parse(
  '{"meggs":[{"name":"PraktischeInformatik","grades":[{"name":"Programmierung","grade":"2","ects":"8"},{"name":"DSAL","grade":"2","ects":"8"},{"name":"Datenbanken","grade":"2","ects":"6"},{"name":"SWT","grade":"2","ects":"6"}]},{"name":"TechnischeInformatik","grades":[{"name":"TI","grade":"2","ects":"6"},{"name":"BUS","grade":"2","ects":"6"},{"name":"Datkom","grade":"2","ects":"6"}]},{"name":"TheoretischeInformatik","grades":[{"name":"Fosap","grade":"2","ects":"6"},{"name":"BuK","grade":"2","ects":"7"},{"name":"Malo","grade":"4","ects":"7"}]},{"name":"Mathematik","grades":[{"name":"DS","grade":"2","ects":"6"},{"name":"AfI","grade":"2","ects":"8"},{"name":"LA","grade":"2","ects":"6"},{"name":"Stocha","grade":"2","ects":"6"}]},{"name":"Sonstiges","grades":[{"name":"Proseminar","grade":"2","ects":"3"},{"name":"Seminar","grade":"2","ects":"5"}]},{"name":"Wahlpflicht","grades":[{"name":"DPN","grade":"2","ects":"6"},{"name":"AI","grade":"2","ects":"6"},{"name":"Compilerbau","grade":"2","ects":"6"},{"name":"CSE","grade":"2","ects":"6"}]},{"name":"Anwendungsfach","grades":[{"name":"NumA1","grade":"2","ects":"6"},{"name":"MathePraktikum","grade":"2","ects":"6"},{"name":"Cobra","grade":"2","ects":"10"}]}]}'
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
      <Container className="col-12 col-lg-9 col-xl-7">
        <div className="app-header d-flex flex-wrap flex-column flex-sm-row align-items-stretch align-items-sm-center has-column-gap-3">
          <h1 className="fw-bold">
            Notenstreicher
          </h1>
          <div className="d-flex gap-2 flex-column flex-sm-row align-items-stretch">
            <Button variant="primary" onClick={onCalculate}>
              Calculate
            </Button>
            <Button variant="success" onClick={addCategory}>
              Add Grade Area
            </Button>
            <Button variant="secondary" onClick={resetForm}>
              Reset Form
            </Button>
          </div>
        </div>

        <p>
          DO NOT enter Final Thesis, Non-Technical Module, PSP, Mentoring as these cannot be cancelled / are ungraded!
          DO NOT enter ungraded courses and courses which were temporarily ungraded due to the SARS-COV-2 pandemic. They do not influence your final grade at all.
        </p>

        <div className="d-flex flex-column gap-5" >
          {transcript.meggs.map((gradeArea, i) => (
            <MEGGDisplay
              key={i}
              gradeArea={gradeArea}
              updateGradeArea={updateGradeArea(i)}
              removeGradeArea={removeGradeArea(i)}
            />
          ))}
        </div>

        <div className="app-footer">
          <p>
            (c) 2021 <a href="https://laurenzfg.com">laurenzfg</a>. Source code
            is published at{" "}
            <a href="https://github.com/laurenzfg/notenstreicher">GitHub</a>.<br />
            Data Protection Statement: The data processing happens on your machine.
            So the data created while using the app (e.g. your grades) is not sent to any party, including me.
            Your access to the service might be logged and might be processed in adherence to EU and US law by my hosting provider GitHub Pages, though.
            "Please note that GitHub may collect User Personal Information from visitors to your GitHub Pages website, including logs of visitor IP addresses, to comply with legal obligations, and to maintain the security and integrity of the Website and the Service."
          </p>
        </div>
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
          <p>
            Algorithm executed: Compute a tree of all possible grade cancellations. At depth <i>i</i>, we evaluate all possible
            cancellations in area <i>i</i>.
            The leaf nodes of the tree then correspond to all possible cancellations.
            Recursively choose a cancellation with the minimal average grade.
            A cancellation is valid iff:
            <ul>
              <li>at most 30 ECTS are cancelled</li>
              <li>in one area, at most one grade is cancelled</li>
            </ul>
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
