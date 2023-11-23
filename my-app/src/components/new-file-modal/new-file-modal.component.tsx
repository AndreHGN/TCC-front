import React, { useContext, useState } from 'react';
import { Button, Form, Modal, Nav } from 'react-bootstrap';
import { DiagramContext } from '../contexts/diagram-context';
import { useUpdateDiagramModel } from '../../hooks/use-update-diagram-model';
import { DesignPatternTypes, DesignPatterns } from '../../enum/design-patterns';
import { getDesignPatternModel, getDesignPatternsByType } from '../../utils/design-pattern';

interface NewFileModalProps {
  show: boolean;
  onClose: () => void;
}

export const NewFileModal = ({show, onClose}: NewFileModalProps): React.ReactElement => {
  const [validated, setValidated] = useState(false);
  const [designPatternType, setDesignPatternType] = useState(DesignPatternTypes.Behavioral);

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
    const fileName = formDataObj.fileName?.toString();
    const designPattern = formDataObj.designPattern?.toString();

    console.log(formDataObj);
    
    setDiagram?.({
      name: fileName,
      designPattern: designPattern as DesignPatterns,
    })
    
    updateDiagramModel(designPattern
      ? getDesignPatternModel(designPattern as DesignPatterns)
      : undefined);
    
    setValidated(true);
    onClose();
  }

  const designPatternOptions = getDesignPatternsByType[designPatternType];

  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={handleSubmit} validated={validated}>
        <Modal.Header closeButton>
          <Modal.Title>Create new diagram</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className='mb-4'>
          <Form.Label className='fw-semibold fs-5'>File name</Form.Label>
          <Form.Control name='fileName' required type='text' defaultValue='Untitled' />
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label className='fw-semibold fs-5'>Design pattern template</Form.Label>
          <Nav
            variant='underline'
            justify
            activeKey={designPatternType}
            onSelect={(type) => setDesignPatternType(type as DesignPatternTypes)}
            className='me-auto mb-2'
          >
            <Nav.Item>
              <Nav.Link eventKey={DesignPatternTypes.Behavioral}>{DesignPatternTypes.Behavioral}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={DesignPatternTypes.Creational}>{DesignPatternTypes.Creational}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={DesignPatternTypes.Structural}>{DesignPatternTypes.Structural}</Nav.Link>
            </Nav.Item>
          </Nav>
          <Form.Select name='designPattern'>
            <option key='none'>None</option>
            {designPatternOptions.map(designPattern => {
              return (
                <option key={designPattern} value={designPattern}>{designPattern}</option>
              )
            })}
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