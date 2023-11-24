import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { DiagramContext } from '../contexts/diagram-context';
import { useUpdateDiagramModel } from '../../hooks/use-update-diagram-model';
import { DesignPatterns } from '../../enum/design-patterns';
import { getDesignPatternModel } from '../../utils/design-pattern';
import { DesignPatternSelection } from '../design-pattern-selection/design-pattern-selection.component';
import { FileHandleContext } from '../contexts/file-handle-context';

interface NewFileModalProps {
  show: boolean;
  onClose: () => void;
}

export const NewFileModal = ({show, onClose}: NewFileModalProps): React.ReactElement => {
  const [validated, setValidated] = useState(false);
  const [selectedDesignPattern, setSelectedDesignPattern] = useState<DesignPatterns>();

  const { setDiagram } = useContext(DiagramContext);
  const { updateDiagramModel } = useUpdateDiagramModel();
  const { setFileHandle } = useContext(FileHandleContext);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return
    }
    
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());
    
    updateDiagramModel(selectedDesignPattern
      ? getDesignPatternModel(selectedDesignPattern)
      : undefined);

    setDiagram?.(prevState => {
      return {
        ...prevState,
        name: formDataObj.diagramName?.toString(),
        designPattern: selectedDesignPattern,
      }
    })
    
    setFileHandle?.(undefined);
    setValidated(true);
    onClose();
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={handleSubmit} validated={validated}>
        <Modal.Header closeButton>
          <Modal.Title>Create new diagram</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-4'>
            <Form.Label className='fw-semibold fs-5'>Diagram name</Form.Label>
            <Form.Control name='diagramName' required type='text' defaultValue='Untitled' />
          </Form.Group>
          <DesignPatternSelection
            selectedDesignPattern={selectedDesignPattern}
            onSelectDesignPattern={setSelectedDesignPattern}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onClose}>Close</Button>
          <Button variant='primary' type='submit'>Create</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}