import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import MEGGDisplay from "./MEGG";

import "./App.css";

const App = () => {
  const initialTranscript = {
    "BSc 2022": JSON.parse(
      '{"po": "BSc 2022", "meggs": [{ "name": "PraktischeInformatik", "grades": [{ "name": "Programmierung", "grade": "2", "ects": "8" }, { "name": "DSAL", "grade": "2", "ects": "7" }, { "name": "Datenbanken", "grade": "2", "ects": "6" }, { "name": "SWT", "grade": "2", "ects": "6" }, { "name": "Elements of Machine Learning and Data Science", "grade": "2", "ects": "6" }] }, { "name": "TechnischeInformatik", "grades": [{ "name": "TI", "grade": "2", "ects": "6" }, { "name": "BUS", "grade": "2", "ects": "7" }, { "name": "Datkom", "grade": "2", "ects": "6" }, { "name": "IT-Security", "grade": "2", "ects": "4" } ] }, { "name": "TheoretischeInformatik", "grades": [{ "name": "Fosap", "grade": "2", "ects": "6" }, { "name": "BuK", "grade": "2", "ects": "7" }, { "name": "Malo", "grade": "4", "ects": "7" }] }, { "name": "Mathematik", "grades": [{ "name": "DS", "grade": "2", "ects": "6" }, { "name": "AfI", "grade": "2", "ects": "8" }, { "name": "LA", "grade": "2", "ects": "6" }, { "name": "Stocha", "grade": "2", "ects": "6" }] }, { "name": "Sonstiges", "grades": [{ "name": "Proseminar", "grade": "2", "ects": "4" }, { "name": "Seminar", "grade": "2", "ects": "4" }] }, { "name": "Wahlpflicht / Anwendung", "grades": [{ "name": "DPN", "grade": "2", "ects": "6" }, { "name": "AI", "grade": "2", "ects": "6" }, { "name": "Compilerbau", "grade": "2", "ects": "6" }, { "name": "CSE", "grade": "2", "ects": "6" }, { "name": "NumA I", "grade": "2", "ects": "6" }, { "name": "Computeralgebra", "grade": "2", "ects": "6" }] } ] }'
    ),
    "BSc 2018": JSON.parse(
      '{"po": "BSc 2018", "meggs":[{"name":"PraktischeInformatik","grades":[{"name":"Programmierung","grade":"2","ects":"8"},{"name":"DSAL","grade":"2","ects":"8"},{"name":"Datenbanken","grade":"2","ects":"6"},{"name":"SWT","grade":"2","ects":"6"}]},{"name":"TechnischeInformatik","grades":[{"name":"TI","grade":"2","ects":"6"},{"name":"BUS","grade":"2","ects":"6"},{"name":"Datkom","grade":"2","ects":"6"}]},{"name":"TheoretischeInformatik","grades":[{"name":"Fosap","grade":"2","ects":"6"},{"name":"BuK","grade":"2","ects":"7"},{"name":"Malo","grade":"4","ects":"7"}]},{"name":"Mathematik","grades":[{"name":"DS","grade":"2","ects":"6"},{"name":"AfI","grade":"2","ects":"8"},{"name":"LA","grade":"2","ects":"6"},{"name":"Stocha","grade":"2","ects":"6"}]},{"name":"Sonstiges","grades":[{"name":"Proseminar","grade":"2","ects":"3"},{"name":"Seminar","grade":"2","ects":"5"}]},{"name":"Wahlpflicht","grades":[{"name":"DPN","grade":"2","ects":"6"},{"name":"AI","grade":"2","ects":"6"},{"name":"Compilerbau","grade":"2","ects":"6"},{"name":"CSE","grade":"2","ects":"6"}]},{"name":"Anwendungsfach","grades":[{"name":"NumA1","grade":"2","ects":"6"},{"name":"MathePraktikum","grade":"2","ects":"6"},{"name":"Cobra","grade":"2","ects":"10"}]}]}'
    ),
    // "MSc 2023": JSON.parse(
    //   '{"meggs":[{"name":"PraktischeInformatik","grades":[{"name":"Programmierung","grade":"3","ects":"8"},{"name":"DSAL","grade":"2","ects":"8"},{"name":"Datenbanken","grade":"2","ects":"6"},{"name":"SWT","grade":"2","ects":"6"}]},{"name":"TechnischeInformatik","grades":[{"name":"TI","grade":"2","ects":"6"},{"name":"BUS","grade":"2","ects":"6"},{"name":"Datkom","grade":"2","ects":"6"}]},{"name":"TheoretischeInformatik","grades":[{"name":"Fosap","grade":"2","ects":"6"},{"name":"BuK","grade":"2","ects":"7"},{"name":"Malo","grade":"4","ects":"7"}]},{"name":"Mathematik","grades":[{"name":"DS","grade":"2","ects":"6"},{"name":"AfI","grade":"2","ects":"8"},{"name":"LA","grade":"2","ects":"6"},{"name":"Stocha","grade":"2","ects":"6"}]},{"name":"Sonstiges","grades":[{"name":"Proseminar","grade":"2","ects":"3"},{"name":"Seminar","grade":"2","ects":"5"}]},{"name":"Wahlpflicht","grades":[{"name":"DPN","grade":"2","ects":"6"},{"name":"AI","grade":"2","ects":"6"},{"name":"Compilerbau","grade":"2","ects":"6"},{"name":"CSE","grade":"2","ects":"6"}]},{"name":"Anwendungsfach","grades":[{"name":"NumA1","grade":"2","ects":"6"},{"name":"MathePraktikum","grade":"2","ects":"6"},{"name":"Cobra","grade":"2","ects":"10"}]}]}'
    // ),
    // "MSc 2010": JSON.parse(
    //   '{"meggs":[{"name":"PraktischeInformatik","grades":[{"name":"Programmierung","grade":"4","ects":"8"},{"name":"DSAL","grade":"2","ects":"8"},{"name":"Datenbanken","grade":"2","ects":"6"},{"name":"SWT","grade":"2","ects":"6"}]},{"name":"TechnischeInformatik","grades":[{"name":"TI","grade":"2","ects":"6"},{"name":"BUS","grade":"2","ects":"6"},{"name":"Datkom","grade":"2","ects":"6"}]},{"name":"TheoretischeInformatik","grades":[{"name":"Fosap","grade":"2","ects":"6"},{"name":"BuK","grade":"2","ects":"7"},{"name":"Malo","grade":"4","ects":"7"}]},{"name":"Mathematik","grades":[{"name":"DS","grade":"2","ects":"6"},{"name":"AfI","grade":"2","ects":"8"},{"name":"LA","grade":"2","ects":"6"},{"name":"Stocha","grade":"2","ects":"6"}]},{"name":"Sonstiges","grades":[{"name":"Proseminar","grade":"2","ects":"3"},{"name":"Seminar","grade":"2","ects":"5"}]},{"name":"Wahlpflicht","grades":[{"name":"DPN","grade":"2","ects":"6"},{"name":"AI","grade":"2","ects":"6"},{"name":"Compilerbau","grade":"2","ects":"6"},{"name":"CSE","grade":"2","ects":"6"}]},{"name":"Anwendungsfach","grades":[{"name":"NumA1","grade":"2","ects":"6"},{"name":"MathePraktikum","grade":"2","ects":"6"},{"name":"Cobra","grade":"2","ects":"10"}]}]}'
    // ),
  };

  const [storageConsent, setStorageConsent] = useState(false);
  
  const defaultPO = "BSc 2022";
  const [transcript, updateTranscript] = useState(initialTranscript[defaultPO]);

  // for the result modal
  const [show, setShow] = useState(false);
  const [cancellationRecommendation, setCancellationRecommendation] =
    useState("");
  const handleClose = () => setShow(false);

  const handlePoButtonClick = (event) => {
    updateTranscript(initialTranscript[event.target.value]);
  };

  const addCategory = () => {
    const emptyCategory = {
      name: "",
      grades: [],
    };

    let transcriptWithAddedCategory = {
      ...transcript,
      meggs: [emptyCategory, ...transcript.meggs],
    };

    updateTranscript(transcriptWithAddedCategory);

    console.log(transcript);
  };

  const resetForm = () => {
    updateTranscript(initialTranscript[defaultPO]);
  };

  const updateGradeArea = (i) => {
    return (updatedCategory) => {
      let transcriptWithUpdatedCategory = { ...transcript, meggs: [...transcript.meggs] };
      transcriptWithUpdatedCategory.meggs[i] = updatedCategory;
      updateTranscript(transcriptWithUpdatedCategory);
    };
  };

  const removeGradeArea = (i) => {
    return () => {
      let transcriptWithUpdatedCategory = { ...transcript, meggs: [...transcript.meggs] };
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
    if (storageConsent) {
      localStorage.setItem("ts", transcriptAsJSON);
    }
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

  const handleWithdrawConsent = (event) => {
    setStorageConsent(false);
    localStorage.setItem("ts", "noconsent");
  };

  
  const handleGiveConsent = (event) => {
    setStorageConsent(true);
    const transcriptAsJSON = JSON.stringify(transcript);
    localStorage.setItem("ts", transcriptAsJSON);
  };

  // Try to load from storage ONCE at startup
  useEffect(() => {
    var savedTranscript = localStorage.getItem("ts");
    if (savedTranscript && savedTranscript !== "noconsent") {
      console.log("ts loaded from storage")
      savedTranscript = JSON.parse(savedTranscript);
      setStorageConsent(true);
      updateTranscript(savedTranscript);
    } else if (savedTranscript === null) {
      // assume consent (saving feature is opt out)
      setStorageConsent(true);
    }
  }, []);

  return (
    <>
      <Container className="col-12 col-lg-12 col-xl-9">
        <div className="app-header d-flex flex-wrap flex-column flex-sm-row align-items-stretch align-items-sm-center has-column-gap-3">
          <h1 className="fw-bold">
            Notenstreicher
          </h1>
          <div className="d-flex gap-2 flex-column flex-sm-row align-items-stretch">
            <Button variant="primary" onClick={onCalculate}>
              Calculate {storageConsent && 
                <span>& Save</span>
              }
            </Button>
            <Button variant="success" onClick={addCategory}>
              Add Grade Area
            </Button>
            <Button variant="secondary" onClick={resetForm}>
              Reset Form
            </Button>
          </div>
          <div className="d-flex flex-column flex-md-row align-items-stretch ms-md-auto btn-group pt-3 pt-md-0">
            {
              Object.keys(initialTranscript).map(thisPo => (
                <Button key={thisPo} value={thisPo} variant={thisPo === transcript.po.toString() ? 'primary active' : 'primary'} onClick={handlePoButtonClick}>
                  {thisPo}
                </Button>
              ))
            }
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
            (c) 2021 - 2023 <a href="https://laurenzfg.com">laurenzfg</a>. Source code
            is published at{" "}
            <a href="https://github.com/laurenzfg/notenstreicher">GitHub</a>.</p>
            {storageConsent && 
            <p>We save your transcript to your local device for future uses of Notenstreicher whenever you press "Calculate". Don't want this? <Button variant="secondary" onClick={handleWithdrawConsent}>Purge + Withdraw consent.</Button></p>
            }
            {!storageConsent && 
              <p>Per your request, your transcript will NOT be saved to your local device for future uses of Notenstreicher. Want this? <Button variant="secondary" onClick={handleGiveConsent}>Give consent.</Button></p>
            }
            <p>
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
          {storageConsent && 
            <p>Your transcript was saved to your local device for future uses of Notenstreicher. Don't want this? Purge + Withdraw consent in the page footer.</p>
          }
          {!storageConsent && 
            <p>Per your request, your transcript was NOT saved to your local device for future uses of Notenstreicher. Want this? Give consent in the page footer.</p>
          }
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
