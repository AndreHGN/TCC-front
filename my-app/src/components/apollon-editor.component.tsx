import { ApollonEditor, ApollonOptions } from "@ls1intum/apollon";
import { Component } from "react";

interface Props{
  options: ApollonOptions;
  setEditor: (editor: ApollonEditor) => void;
}

type State = {}

export class ApollonEditorComponent extends Component<Props, State> {
  private readonly containerRef: (element: HTMLDivElement) => void;
  private ref?: HTMLDivElement;
  private client: any;

  constructor(props: Props) {
    super(props);
    this.containerRef = (element: HTMLDivElement) => {
      this.ref = element;
      if (this.ref) {
        const editor = new ApollonEditor(this.ref, this.props.options);

        this.props.setEditor(editor);
      }
    };
  }

  render() {
    return <div ref={this.containerRef} />;
  }
}
