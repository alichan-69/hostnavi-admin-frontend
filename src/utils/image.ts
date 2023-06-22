export const resizeCanvas = (canvas: HTMLCanvasElement, width: number, height: number) => {
  const ctx = canvas.getContext('2d');

  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  tempCtx?.drawImage(canvas, 0, 0);

  canvas.width = width;
  canvas.height = height;

  ctx?.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvas.width, canvas.height);

  return canvas;
};
