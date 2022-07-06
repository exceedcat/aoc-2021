const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

let [x, y, depth] = [0, 0, 0];
const moves = {
    up: (value) => y -= value,
    down: (value) => y += value,
    forward: (value) => {
        x += value;
        // 2 only
        depth += y * value;
    },
};
const move = ([direction, value]) => moves[direction](+value);

inputData.map(step => move(step.split(' ')))
// 1
console.log(x * y);
// 2
console.log(x * depth);