import { UMLModel } from '@ls1intum/apollon';
import { createContext } from 'react';
import { DesignPatterns } from '../../enum/design-patterns';

export type Diagram = {
  name?: string;
  model?: UMLModel;
  designPattern?: DesignPatterns;
  isModified: boolean;
}

export type DiagramContextType = {
  diagram?: Diagram;
  setDiagram?: React.Dispatch<React.SetStateAction<Diagram>>;
  setIsModified?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DiagramContext = createContext<DiagramContextType>({});