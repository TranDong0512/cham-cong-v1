const imageAngleRanges = [
    {
        positions: "front",
        direction: [0, 0],
    },
    {
        positions: "right",
        direction: [83, 5],
    },
    {
        positions: "downright",
        direction: [6, 16],
    },
    {
        positions: "down",
        direction: [17, 27],
    },
    { positions: "downleft", direction: [28, 38] },
    { positions: "left", direction: [39, 49] },
    { positions: "upleft", direction: [50, 60] },
    { positions: "up", direction: [61, 71] },
    { positions: "upright", direction: [72, 82] },
];

const imageAngles = [];

for (var i = 0; i < 9; i++) {
    const [startAngle, endAngle] = imageAngleRanges[i].direction;
    const angles = [];
    if (startAngle < endAngle) {
        for (let i = startAngle; i <= endAngle; i++) {
            angles.push(i);
        }
    } else {
        for (let i = startAngle; i <= 90; i++) {
            angles.push(i);
        }
        for (let i = 1; i <= endAngle; i++) {
            angles.push(i);
        }
    }
    imageAngles.push({
        positions: imageAngleRanges[i].positions,
        direction: angles,
    });
}
export default imageAngles;
