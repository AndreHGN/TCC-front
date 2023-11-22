import React, { useState } from 'react';
import { ApollonEditor, ApollonMode, Locale, UMLDiagramType, ApollonOptions } from '@ls1intum/apollon';
import { ApollonEditorComponent } from './components/apollon-editor/apollon-editor.component';
import { NavigationBar } from './components/navbar/navbar.component';
import { Diagram, DiagramContext, DiagramContextType } from './components/contexts/diagram-context';
import { ApollonContextType, ApollonContext } from './components/contexts/editor-context';

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
    designPattern: 'MVC',
    model: undefined,
  });

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

  return (
    <ApollonContext.Provider value={apollonContextValue}>
      <DiagramContext.Provider value={diagramContextValue}>
        {diagram?.name}
        {diagram?.designPattern}
        <NavigationBar/>
        <ApollonEditorComponent />
      </DiagramContext.Provider>
    </ApollonContext.Provider>
  );
}

export default App;