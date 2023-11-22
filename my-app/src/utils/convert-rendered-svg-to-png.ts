import { SVG } from "@ls1intum/apollon";

export const convertRenderedSVGToPNG = (renderedSVG: SVG, whiteBackground: boolean): Promise<Blob> => {
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