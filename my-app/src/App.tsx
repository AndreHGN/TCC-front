import React, { ChangeEvent, useState } from 'react';
import { ApollonEditor, ApollonMode, Locale, UMLDiagramType, SVG, ApollonOptions } from '@ls1intum/apollon';
import { Button } from 'react-bootstrap';
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
  
  const [diagram, setDiagram] = useState<Diagram>();

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

  const handleImportFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (e) => {
        if (e.target?.result) {
          const model = JSON.parse(e.target.result as string);
          setOptions({...options, model});
          setDiagram({...diagram, model});
        }
      }
    }
  }

  const handleDownloadJSON = () => {
    const data = JSON.stringify(diagram?.model);
    const blob = new Blob([data], {type: "application/json"});
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.setAttribute('href', objectUrl);
    link.setAttribute('download', 'teste');
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const exportPng = () => {
    editor?.exportAsSVG().then((renderedSvg) => {
      return convertRenderedSVGToPNG(renderedSvg, true);
    }).then((blob) => {
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
  
      link.setAttribute('href', objectUrl);
      link.setAttribute('download', 'teste');
      link.style.display = 'none';
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
  }

  return (
    <ApollonContext.Provider value={apollonContextValue}>
      <DiagramContext.Provider value={diagramContextValue}>
        <NavigationBar/>
        <Button variant='secondary' onClick={exportPng}>Baixar PNG</Button>
        <button onClick={handleDownloadJSON}>Baixar JSON</button>
        <input type="file" onChange={handleImportFile} value={undefined}/>
        <ApollonEditorComponent />
      </DiagramContext.Provider>
    </ApollonContext.Provider>
  );
}

export default App;

const convertRenderedSVGToPNG = (renderedSVG: SVG, whiteBackground: boolean): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const { width, height } = renderedSVG.clip;

    const blob = new Blob([renderedSVG.svg], { type: 'image/svg+xml' });
    const blobUrl = URL.createObjectURL(blob);

    const image = new Image();
    image.width = width;
    image.height = height;
    image.src = blobUrl;

    image.onload = () => {
      let canvas: HTMLCanvasElement;
      canvas = document.createElement('canvas');
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const scale = 1.5;
      canvas.width = width * scale;
      canvas.height = height * scale;

      const context = canvas.getContext('2d')!;

      if (whiteBackground) {
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      context.scale(scale, scale);
      context.drawImage(image, 0, 0);

      canvas.toBlob(resolve as BlobCallback);
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
}