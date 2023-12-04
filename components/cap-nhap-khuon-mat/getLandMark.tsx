let arrNull = new Array(144).fill(0);
export default function getLandmarksArray(landmarks, width, height) {
    try {
        const arrayPoint = [];

        if (landmarks) {
            const { maxX, minX, maxY, minY, maxZ, minZ } = landmarks.reduce(
                (acc, element) => {
                    // Update maxX and minX
                    acc.maxX = Math.max(acc.maxX, element.x);
                    acc.minX = Math.min(acc.minX, element.x);

                    // Update maxY and minY
                    acc.maxY = Math.max(acc.maxY, element.y);
                    acc.minY = Math.min(acc.minY, element.y);

                    // Update maxZ and minZ
                    acc.maxZ = Math.max(acc.maxZ, element.z);
                    acc.minZ = Math.min(acc.minZ, element.z);

                    return acc;
                },
                {
                    maxX: Number.NEGATIVE_INFINITY,
                    minX: Number.POSITIVE_INFINITY,
                    maxY: Number.NEGATIVE_INFINITY,
                    minY: Number.POSITIVE_INFINITY,
                    maxZ: Number.NEGATIVE_INFINITY,
                    minZ: Number.POSITIVE_INFINITY,
                }
            );

            landmarks.forEach((element, index) => {
                arrayPoint.push((element.x - (maxX + minX) / 2) / width);
                arrayPoint.push((element.y - (maxY + minY) / 2) / height);
                arrayPoint.push(
                    (element.z - (maxZ + minZ) / 2) / (maxZ - minZ)
                );
            });
            return arrayPoint;
        } else return arrNull;
    } catch (err) {
        console.error(err);
        return arrNull;
    }
}
