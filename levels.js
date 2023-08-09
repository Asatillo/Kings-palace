// -1 == white cell
// 0 == 0 bulbs
// 1 == 1 bulb
// 2 == 2 bulbs
// 3 == 3 bulbs
// 4 == any amount
const levels = {
    easy: [
        [-1,-1,-1, 1,-1,-1,-1],
        [-1, 0,-1,-1,-1, 2,-1],
        [-1,-1,-1,-1,-1,-1,-1],
        [ 4,-1,-1, 4,-1,-1, 4],
        [-1,-1,-1,-1,-1,-1,-1],
        [-1, 4,-1,-1,-1, 2,-1],
        [-1,-1,-1, 3,-1,-1,-1],
    ],
    advanced: [
        [-1,-1, 0,-1, 4,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1],
        [ 4,-1, 4,-1, 3,-1, 4],
        [-1,-1,-1, 1,-1,-1,-1],
        [ 2,-1, 4,-1, 4,-1, 4],
        [-1,-1,-1,-1,-1,-1,-1],
        [-1,-1, 4,-1, 2,-1,-1]],
    extreme: [
        [-1, 4,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1, 3,-1, 2,-1, 4],
        [-1, 0, 4,-1,-1,-1,-1, 4,-1,-1],
        [-1,-1,-1,-1, 4,-1,-1,-1,-1,-1],
        [-1, 1,-1,-1, 4, 1, 4,-1,-1,-1],
        [-1,-1,-1, 4, 4, 4,-1,-1, 3,-1],
        [-1,-1,-1,-1,-1, 4,-1,-1,-1,-1],
        [-1,-1, 1,-1,-1,-1,-1, 0, 4,-1],
        [ 3,-1, 4,-1, 0,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1, 0,-1]]
};