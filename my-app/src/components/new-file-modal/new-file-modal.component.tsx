import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { DiagramContext } from '../contexts/diagram-context';
import { useUpdateDiagramModel } from '../../hooks/use-update-diagram-model';

interface NewFileModalProps {
  show: boolean;
  onClose: () => void;
}

export const NewFileModal = ({show, onClose}: NewFileModalProps): React.ReactElement => {
  const [validated, setValidated] = useState(false);

  const { setDiagram } = useContext(DiagramContext);
  const { updateDiagramModel } = useUpdateDiagramModel()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return
    }
    
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());
    
    setDiagram?.({
      name: formDataObj.fileName?.toString(),
      designPattern: formDataObj.designPattern.toString(),
    })
    
    updateDiagramModel(undefined);
    
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
        <Form.Group className='mb-3'>
          <Form.Label>File name</Form.Label>
          <Form.Control name='fileName' required type='text' defaultValue='Untitled' />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Architectural design pattern</Form.Label>
          <Form.Select name='designPattern'>
            <option value='MVC'>MVC</option>
          </Form.Select>
        </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onClose}>Close</Button>
          <Button variant='primary' type='submit'>Create</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}