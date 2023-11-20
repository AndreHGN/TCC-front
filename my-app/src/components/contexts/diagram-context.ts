import { UMLModel } from '@ls1intum/apollon';
import { createContext } from 'react';

export type Diagram = {
  name?: string;
  model?: UMLModel;
}

export type DiagramContextType = {
  diagram?: Diagram;
  setDiagram?: React.Dispatch<React.SetStateAction<Diagram | undefined>>;
}

export const DiagramContext = createContext<DiagramContextType>({});