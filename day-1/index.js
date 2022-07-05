const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

const getIncrease = (data) => data.reduce((res, curr, i) => res + (+curr > +data[i - 1]), 0)
const windowData = (data) => data.reduce((res, curr, i) => data[i + 2]
    ? [...res, +curr + +data[i + 1] + +data[i + 2]]
    : res, []);

const res1 = getIncrease(inputData)
const res2 = getIncrease(windowData(inputData))
console.log(res1)
console.log(res2)