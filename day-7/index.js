const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split(',').map(v => +v);

const min = Math.min(...inputData);
const max = Math.max(...inputData);

const stepCost = (steps) => {
    let res = 0;
    let last = 0;
    for (let i = 1; i <= steps; i++) {
        res += ++last;
    }
    return res;
}

const calcCost = (point) => {
    return inputData.reduce((res, c) => res + stepCost(Math.abs(c - point)), 0)
}

const res = [];
for (let i = min; i <= max; i++) {
    res[i] = calcCost(i)
}
console.log(Math.min(...res));