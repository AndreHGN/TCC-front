import { ApollonEditor, ApollonOptions } from "@ls1intum/apollon"
import { createContext } from "react";

export type ApollonContextType = {
  editor?: ApollonEditor;
  options?: ApollonOptions;
  setEditor?: React.Dispatch<React.SetStateAction<ApollonEditor | undefined>>;
  setOptions?: React.Dispatch<React.SetStateAction<ApollonOptions>>;
}

export const ApollonContext = createContext<ApollonContextType>({});