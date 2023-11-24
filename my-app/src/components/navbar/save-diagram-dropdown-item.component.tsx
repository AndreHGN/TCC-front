import { Fragment, useContext } from "react";
import { NavDropdown } from "react-bootstrap"
import { DiagramContext } from "../contexts/diagram-context";
import { FileHandleContext } from "../contexts/file-handle-context";
import { getNewFileHandle, writeFile } from "../../utils/file-handle";

export const SaveDiagramDropdownItem = () => {
  const { diagram, setDiagram } = useContext(DiagramContext);
  const { fileHandle, setFileHandle } = useContext(FileHandleContext);

  const handleSaveDiagram = (fileHandle?: FileSystemFileHandle) => {
    const data = JSON.stringify({model: diagram?.model, designPattern: diagram?.designPattern, name: diagram?.name});

    if (!fileHandle) {
      getNewFileHandle().then(handle => {
        writeFile(handle as FileSystemFileHandle, data).then((success) => {
          if (success) {
            setFileHandle?.(handle);
            setDiagram?.(prevState => {return {...prevState, isModified: false}})
          };
        });
      }).catch(err => {
        console.log(err)
      })
    } else {
      writeFile(fileHandle, data).then((success) => {
        if (success) setDiagram?.(prevState => {return {...prevState, isModified: false}})
      });
    }
  }

  return (
    <Fragment>
      <NavDropdown.Item onClick={() => handleSaveDiagram(fileHandle)}>Save</NavDropdown.Item>
      <NavDropdown.Item onClick={() => handleSaveDiagram(undefined)}>Save as</NavDropdown.Item>
    </Fragment>
  )
}