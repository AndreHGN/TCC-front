import React from 'react';
import { Badge } from "react-bootstrap";
import { DesignPatterns } from '../../enum/design-patterns';
import styled from 'styled-components';

interface DesignPatternBadgeProps {
  designPattern?: DesignPatterns;
  className?: string;
}

const CustomBadge = styled(Badge)`
  font-size: 24px;
`

export const DesignPatternBadge = ({ designPattern, className }: DesignPatternBadgeProps): React.ReactElement => {
  return  (
    <CustomBadge className={className} bg='info'>{designPattern}</CustomBadge>
  )
}