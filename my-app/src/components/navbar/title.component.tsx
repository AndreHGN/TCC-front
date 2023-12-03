import React, { useContext } from 'react';
import styled from 'styled-components';
import { DiagramContext } from '../contexts/diagram-context';

const Input = styled.input`
  font-size: 32px;
  font-weight: bold;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0;

  &:hover {
    border: 1px solid gray;
  }
`

interface NavbarTitleProps {
  className?: string;
}

export const NavbarTitle = ({ className }: NavbarTitleProps): React.ReactElement => {
  const { diagram, setDiagram } = useContext(DiagramContext);
  
  const handleTitleChange = (input: HTMLInputElement) => {
    setDiagram?.(prevState => {
      return { ...prevState, name: input.value }
    });
  }

  const handleOnBlur = (input: HTMLInputElement) => {
    if (!input.value) {
      input.value = 'Untitled';
      setDiagram?.(prevState => {
        return { ...prevState, name: 'Untitled' }
      });
    }
  }
  
  return (
    <Input
      className={className}
      value={diagram?.name}
      onChange={e => handleTitleChange(e.target)}
      size={diagram?.name?.length}
      onBlur={e => handleOnBlur(e.target)}
    />
  )
}