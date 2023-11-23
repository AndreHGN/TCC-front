import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { DiagramContext } from '../contexts/diagram-context';
import { useUpdateDiagramModel } from '../../hooks/use-update-diagram-model';

interface LoadFileModalProps {
  show: boolean;
  onClose: () => void;
}

export const LoadFileModal = ({show, onClose}: LoadFileModalProps): React.ReactElement => {
  const [validated, setValidated] = useState(false);

  const { updateDiagramModel } = useUpdateDiagramModel();
  const { setDiagram } = useContext(DiagramContext);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return
    }
    
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());
    const file = formDataObj.file as File;
    const fileName = file.name.replace('.json', '');
    
    const reader = new FileReader();
    reader.readAsText(file as Blob, "UTF-8");
    reader.onload = (e) => {
      if (e.target?.result) {
        const jsonDiagram = JSON.parse(e.target.result as string);
        updateDiagramModel(jsonDiagram.model);
        setDiagram?.(prevState => { return { ...prevState, name: fileName, designPattern: jsonDiagram.designPattern } })
      }
    }

    setValidated(true);
    onClose();
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={handleSubmit} validated={validated}>
        <Modal.Header closeButton>
          <Modal.Title>Load diagram</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Label>JSON File</Form.Label>
            <Form.Control name='file' required type='file' accept='.json' />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onClose}>Close</Button>
          <Button variant='primary' type='submit'>Load</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}