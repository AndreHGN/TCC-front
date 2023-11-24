import React, { useState } from 'react';
import { ApollonEditor, ApollonMode, Locale, UMLDiagramType, ApollonOptions } from '@ls1intum/apollon';
import { ApollonEditorComponent } from './components/apollon-editor/apollon-editor.component';
import { NavigationBar } from './components/navbar/navbar.component';
import { Diagram, DiagramContext, DiagramContextType } from './components/contexts/diagram-context';
import { ApollonContextType, ApollonContext } from './components/contexts/editor-context';
import { FileHandleContext, FileHandleContextType } from './components/contexts/file-handle-context';

function App() {
  const [editor, setEditor] = useState<ApollonEditor>();
  const [options, setOptions] = useState<ApollonOptions>({
    type: UMLDiagramType.ClassDiagram,
    mode: ApollonMode.Modelling,
    readonly: false,
    enablePopups: true,
    copyPasteToClipboard: true,
    locale: Locale.en,
    colorEnabled: true,
    model: undefined,
  })
  
  const [diagram, setDiagram] = useState<Diagram>({
    name: 'Untitled',
    designPattern: undefined,
    model: undefined,
    isModified: false,
  });

  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle>();

  const apollonContextValue: ApollonContextType = {
    editor,
    options,
    setEditor,
    setOptions,
  }

  const diagramContextValue: DiagramContextType = {
    diagram,
    setDiagram,
  };

  const fileHandleContextValue: FileHandleContextType = {
    fileHandle,
    setFileHandle,
  }
    
  console.log(diagram.isModified);

  return (
    <FileHandleContext.Provider value={fileHandleContextValue}>
      <ApollonContext.Provider value={apollonContextValue}>
        <DiagramContext.Provider value={diagramContextValue}>
          <NavigationBar/>
          <ApollonEditorComponent />
        </DiagramContext.Provider>
      </ApollonContext.Provider>
    </FileHandleContext.Provider>
  );
}

export default App;