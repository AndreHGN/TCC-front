import { useContext } from 'react';
import { ApollonContext } from "../components/contexts/editor-context";
import { DiagramContext } from '../components/contexts/diagram-context';
import { UMLModel } from '@ls1intum/apollon';

interface useupdateDiagramModelModelInterface {
  updateDiagramModel: (model: UMLModel | undefined) => void;
}

export const useUpdateDiagramModel = (): useupdateDiagramModelModelInterface => {
  const { setOptions } = useContext(ApollonContext);
  const { setDiagram } = useContext(DiagramContext);

  const updateDiagramModel = (model: UMLModel | undefined) => {
    setOptions?.(prevState => { return {...prevState, model} });
    setDiagram?.(prevState => { return {...prevState, model} });  
  }

  return { updateDiagramModel };
}