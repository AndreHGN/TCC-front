import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { ApollonEditor, ApollonMode, ApollonOptions, Locale, UMLDiagramType, SVG } from '@ls1intum/apollon';
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

  const handleDownloadJSON = () => {
    const data = JSON.stringify(diagram);
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
    <Fragment>
      <button onClick={exportPng}>Baixar PNG</button>
      <button onClick={handleDownloadJSON}>Baixar JSON</button>
      <input type="file" onChange={handleImportFile} value={undefined}/>
      <ApollonEditorComponent options={options} setEditor={setEditor} setDiagram={setDiagram}/>
    </Fragment>
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