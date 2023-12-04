let directions = [
    "front",
    "front",
    "right",
    "right",
    "downright",
    "downright",
    "down",
    "down",
    "downleft",
    "downleft",
    "left",
    "left",
    "upleft",
    "upleft",
    "up",
    "up",
    "upright",
    "upright",
];
function findMax(arr) {
    if (arr.length === 0) {
        return { value: null, direction: null };
    }

    let max = { value: arr[0], direction: directions[0] };

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max.value && arr[i] > 0.9) {
            max.value = arr[i];
            max.direction = directions[i];
        }
    }
    if (max.value > 0.9) {
        return max;
    } else {
        return { value: null, direction: null };
    }
}

export default findMax;
