import React from 'react';
import { Button } from "react-bootstrap";
import { DesignPatterns } from '../../enum/design-patterns';

interface DesignPatternBadgeProps {
  designPattern?: DesignPatterns;
  className?: string;
  onClick?: () => void;
}

export const DesignPatternBadge = ({ designPattern, className, onClick }: DesignPatternBadgeProps): React.ReactElement => {  
  return designPattern
    ? <Button onClick={onClick} className={'btn-lg fw-bold text-light ' + className} variant='info'>{designPattern}</Button>
    : <Button onClick={onClick} variant='secondary'>Assign design pattern</Button>
}