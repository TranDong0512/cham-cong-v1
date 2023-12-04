function convertToDictLock(arr) {
    const dictLock = {
        front: [],
        left: [],
        right: [],
        up: [],
        down: [],
        up_left: [],
        up_right: [],
        down_left: [],
        down_right: [],
    };
    for (const item of arr) {
        const { img, position } = item;
        switch (position) {
            case "right":
                dictLock.right.push(img);
                break;
            case "downright":
                dictLock.down_right.push(img);
                break;
            case "down":
                dictLock.down.push(img);
                break;
            case "downleft":
                dictLock.down_left.push(img);
                break;
            case "left":
                dictLock.left.push(img);
                break;
            case "upleft":
                dictLock.up_left.push(img);
                break;
            case "up":
                dictLock.up.push(img);
                break;
            case "front":
                dictLock.front.push(img);
                break;
            case "upright":
                dictLock.up_right.push(img);
                break;
            default:
                break;
        }
    }
    return dictLock;
}
export default convertToDictLock;
