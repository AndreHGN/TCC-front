export const downloadLink = (blob: Blob, fileName: string) => {
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.setAttribute('href', objectUrl);
  link.setAttribute('download', fileName);
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}