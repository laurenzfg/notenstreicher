import React from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import MEGGDisplay from "./MEGG";

import "./App.css";

const App = () => {
  return (
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header mb-4">
          Notenstreicher
          <Button variant="primary" className="ms-3">
            Calculate
          </Button>
        </h1>
        <MEGGDisplay title="Methematik" />
        <MEGGDisplay title="Applied CS"/>
      </Container>
    </Container>
  );
};

export default App;
