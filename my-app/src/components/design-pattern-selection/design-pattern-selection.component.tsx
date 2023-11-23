import React, { useState } from "react";
import { Form, ListGroup, Nav } from "react-bootstrap"
import { DesignPatternTypes, DesignPatterns } from "../../enum/design-patterns"
import { getDesignPatternsByType } from "../../utils/design-pattern";

interface DesignPatternSelectionProps {
  selectedDesignPattern: DesignPatterns | undefined;
  onSelectDesignPattern: (desginPattern?: DesignPatterns) => void;
}

export const DesignPatternSelection = ({
  selectedDesignPattern,
  onSelectDesignPattern,
}: DesignPatternSelectionProps): React.ReactElement => {
  const [designPatternType, setDesignPatternType] = useState(DesignPatternTypes.Behavioral);

  const designPatternOptions = getDesignPatternsByType[designPatternType];

  const handleSelectDesignPatternType = (type: DesignPatternTypes) => {
    onSelectDesignPattern(undefined);
    setDesignPatternType(type);
  }

  const handleSelectDesignPattern = (designPattern: DesignPatterns) => {
    selectedDesignPattern === designPattern
      ? onSelectDesignPattern(undefined)
      : onSelectDesignPattern(designPattern);
  }

  return (
    <Form.Group className='mb-4'>
      <Form.Label className='fw-semibold fs-5'>Design pattern</Form.Label>
      <Nav
        variant='tabs'
        justify
        activeKey={designPatternType}
        onSelect={(type) => handleSelectDesignPatternType(type as DesignPatternTypes)}
        className='mb-2'
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
      <ListGroup>
        {designPatternOptions.map(designPattern => {
          return (
            <ListGroup.Item
              key={designPattern}
              action
              active={selectedDesignPattern === designPattern}
              onClick={(e: any) => handleSelectDesignPattern(designPattern)}
              type='button'
            >
              {designPattern}
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </Form.Group>
 )
}