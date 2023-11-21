import { UMLModel } from '@ls1intum/apollon';
import { createContext } from 'react';

export type Diagram = {
  name?: string;
  model?: UMLModel;
  designPattern?: string;
}

export type DiagramContextType = {
  diagram?: Diagram;
  setDiagram?: React.Dispatch<React.SetStateAction<Diagram>>;
}

export const DiagramContext = createContext<DiagramContextType>({});