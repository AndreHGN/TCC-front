import { UMLModel } from '@ls1intum/apollon';
import { createContext } from 'react';
import { DesignPatterns } from '../../enum/design-patterns';

export type Diagram = {
  name?: string;
  model?: UMLModel;
  designPattern?: DesignPatterns;
}

export type DiagramContextType = {
  diagram?: Diagram;
  setDiagram?: React.Dispatch<React.SetStateAction<Diagram>>;
}

export const DiagramContext = createContext<DiagramContextType>({});