import React, { useState } from 'react';
import { ApollonEditor, ApollonMode, ApollonOptions, Locale, UMLDiagramType } from '@ls1intum/apollon';
import './App.css';
import { ApollonEditorComponent } from './components/apollon-editor.component';

function App() {
  const [editor, setEditor] = useState<ApollonEditor>();

  const options: ApollonOptions = {
    type: UMLDiagramType.ClassDiagram,
    mode: ApollonMode.Modelling,
    readonly: false,
    enablePopups: true,
    copyPasteToClipboard: true,
    locale: Locale.en,
    colorEnabled: true,
    model: undefined,
  }

  return (
    <ApollonEditorComponent options={options} setEditor={setEditor} />
  );
}

export default App;
