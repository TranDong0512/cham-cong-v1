function resizeImage(canvas, newWidth, newHeight) {
    const resizedCanvas = document.createElement("canvas");
    const resizedCtx = resizedCanvas.getContext("2d");

    resizedCanvas.width = newWidth;
    resizedCanvas.height = newHeight;

    resizedCtx.drawImage(
        canvas,
        0,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        newWidth,
        newHeight
    );

    return resizedCanvas;
}
let imgInit = new Image();
imgInit.crossOrigin = "Anonymous";

const ExportImg = async (url, boundingBox) => {
    imgInit.src = url;
    const croppedCanvas = document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");

    const fina = Math.max(
        boundingBox.xMax - boundingBox.xMin,
        boundingBox.yMax - boundingBox.yMin
    );
    const width = fina;
    const height = fina;
    croppedCanvas.width = width;
    croppedCanvas.height = height;
    // Draw the cropped image onto the new canvas
    const newBeginX = (boundingBox.xMax + boundingBox.xMin) / 2 - width / 2;
    const newBeginY = (boundingBox.yMax + boundingBox.yMin) / 2 - height / 2;
    // croppedCtx.drawImage(
    //     video,
    //     boundingBox.topLeft[0], boundingBox.topLeft[1], width, height,
    //     0, 0, width, height
    // );
    croppedCtx.drawImage(
        imgInit,
        newBeginX,
        newBeginY,
        width,
        height,
        0,
        0,
        width,
        height
    );

    // Convert the canvas to a data URL and download it
    console.log(width);
    console.log(height);
    let dataUrl;
    if (width > 160 && height > 160) {
        const resizedCanvas = await resizeImage(croppedCanvas, 160, 160);
        dataUrl = await resizedCanvas.toDataURL();
    } else {
        dataUrl = croppedCanvas.toDataURL();
    }
    // const dataUrl = croppedCanvas.toDataURL();
    return dataUrl;
};

export default ExportImg;
