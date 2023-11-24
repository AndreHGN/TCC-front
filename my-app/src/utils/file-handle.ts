export const getNewFileHandle = async () => {
  const options: SaveFilePickerOptions = {
    types: [
      {
        description: 'Json Files',
        accept: {
          'application/json': ['.json'],
        },
      },
    ],
  };
  
  try {
    const handle = await window.showSaveFilePicker(options);
    return handle;
  } catch (err) {
    console.log(err);
  }
}

export const writeFile = async (fileHandle: FileSystemFileHandle, contents: any) => {
  if (fileHandle) {
    try {
      const writable = await fileHandle.createWritable();
      await writable.write(contents);
      await writable.close();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
