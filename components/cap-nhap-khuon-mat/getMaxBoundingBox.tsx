export default function findLargestBoundingBoxElement(results) {
    if (results.length === 0) {
        return null;
    }

    let largestElement = results[0];
    if (results[1]) {
        for (let i = 1; i < results.length; i++) {
            const boundingBox = results[i].detection.box;
            const currentArea = boundingBox.width * boundingBox.height;
            const largestArea =
                largestElement.detection.box.width *
                largestElement.detection.box.height;

            if (currentArea > largestArea) {
                largestElement = results[i];
            }
        }
    }
    return largestElement;
}
