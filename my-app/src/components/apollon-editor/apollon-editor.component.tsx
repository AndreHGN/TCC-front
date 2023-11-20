import { ApollonEditor, ApollonOptions } from "@ls1intum/apollon";
import { useContext, useEffect, useRef } from "react";
import { DiagramContext } from "../contexts/diagram-context";
import { ApollonContext } from "../contexts/editor-context";

export const ApollonEditorComponent = (): React.ReactElement => {
  const ref = useRef<HTMLDivElement>(null);

  const { options, setEditor } = useContext(ApollonContext);

  const { setDiagram } = useContext(DiagramContext);

  useEffect(() => {
    if (ref.current) {
      const editor = new ApollonEditor(ref.current, options as ApollonOptions);
      setEditor?.(editor);

      editor.subscribeToModelChange((model) => {
        setDiagram?.(prevState => {
          return {
            ...prevState,
            model
          }
        });
      })
    }
  }, [setDiagram, options, setEditor]);

  return <div ref={ref} />;
}
