import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { DesignPatternSelection } from "../design-pattern-selection/design-pattern-selection.component";
import { DiagramContext } from "../contexts/diagram-context";
import { DesignPatterns } from "../../enum/design-patterns";

interface AssignDesignPatternModalProps {
  show: boolean;
  onClose: () => void;
}

export const AssignDesignPatternModal = ({show, onClose}: AssignDesignPatternModalProps): React.ReactElement => {
  const [validated, setValidated] = useState(false);
  const { diagram, setDiagram } = useContext(DiagramContext);
  const [selectedDesignPattern, setSelectedDesignPattern] = useState<DesignPatterns | undefined>(diagram?.designPattern);

  
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return
    }
    
    setDiagram?.((prevState) => {
      return {
        ...prevState,
        designPattern: selectedDesignPattern,
      }
    });

    setValidated(true);
    onClose();
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={handleSubmit} validated={validated}>
        <Modal.Header closeButton>
          <Modal.Title>Assign design pattern to diagram</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DesignPatternSelection
            selectedDesignPattern={selectedDesignPattern}
            onSelectDesignPattern={setSelectedDesignPattern}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onClose}>Close</Button>
          <Button variant='primary' type='submit'>Assign</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}