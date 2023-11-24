import { createContext } from "react";

export type FileHandleContextType = {
  fileHandle?: FileSystemFileHandle;
  setFileHandle?: React.Dispatch<React.SetStateAction<FileSystemFileHandle | undefined>>;
}

export const FileHandleContext = createContext<FileHandleContextType>({});