import { ApollonEditor, ApollonOptions } from "@ls1intum/apollon";
import { useEffect, useRef } from "react";

interface Props{
  options: ApollonOptions;
  setEditor: (editor: ApollonEditor) => void;
  setDiagram: (diagram: any) => void;
}

export const ApollonEditorComponent = ({options, setEditor, setDiagram}: Props): React.ReactElement => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const editor = new ApollonEditor(ref.current, options);
      setEditor(editor);

      editor.subscribeToModelChange((model) => {
        setDiagram(model);
      })
    }
  }, [options, setEditor, setDiagram]);

  return <div ref={ref} />;
}
