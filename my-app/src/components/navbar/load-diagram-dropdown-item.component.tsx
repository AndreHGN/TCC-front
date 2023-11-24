import { useContext } from "react";
import { NavDropdown } from "react-bootstrap"
import { DiagramContext } from "../contexts/diagram-context";
import { FileHandleContext } from "../contexts/file-handle-context";
import { useUpdateDiagramModel } from "../../hooks/use-update-diagram-model";

export const LoadDiagramDropdownItem = () => {
  const { setDiagram } = useContext(DiagramContext);
  const { setFileHandle } = useContext(FileHandleContext);

  const { updateDiagramModel } = useUpdateDiagramModel();

  const handleLoadDiagram = () => {
    const options: SaveFilePickerOptions = {
      types: [
        {
          description: 'Json Files',
          accept: {
            'application/json': ['.json'],
          },
        },
      ],
    };

    window.showOpenFilePicker(options).then((fileHandles) => {
      setFileHandle?.(fileHandles[0]);
      fileHandles[0].getFile().then(file => {
        const reader = new FileReader();
        reader.readAsText(file as Blob, "UTF-8");
        reader.onload = (e) => {
          if (e.target?.result) {
            const jsonDiagram = JSON.parse(e.target.result as string);
            updateDiagramModel(jsonDiagram.model);
            setDiagram?.(prevState => { return { ...prevState, name: jsonDiagram.name, designPattern: jsonDiagram.designPattern } })
          }
        }
      });
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <NavDropdown.Item onClick={handleLoadDiagram}>Load diagram</NavDropdown.Item>
  )
}