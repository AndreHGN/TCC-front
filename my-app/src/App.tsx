import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { ApollonEditor, ApollonMode, ApollonOptions, Locale, UMLDiagramType } from '@ls1intum/apollon';
import './App.css';
import { ApollonEditorComponent } from './components/apollon-editor/apollon-editor.component';

function App() {
  const [editor, setEditor] = useState<ApollonEditor>();
  const [diagram, setDiagram] = useState<any>();

  const [options, setOptions] =useState<ApollonOptions>({
    type: UMLDiagramType.ClassDiagram,
    mode: ApollonMode.Modelling,
    readonly: false,
    enablePopups: true,
    copyPasteToClipboard: true,
    locale: Locale.en,
    colorEnabled: true,
    model: undefined,
  });

  useEffect(() => {
    editor?.nextRender.then(() => {
      if (diagram) console.log(diagram);
    });
  }, [editor, diagram]);

  const handleImportFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (e) => {
        if (e.target?.result) {
          const model = JSON.parse(e.target.result as string);
          setOptions({...options, model: model});
        }
      }
    }
  }

  return (
    <Fragment>
      <input type="file" onChange={handleImportFile} value={undefined}/>
      <ApollonEditorComponent options={options} setEditor={setEditor} setDiagram={setDiagram}/>
    </Fragment>
  );
}

export default App;
