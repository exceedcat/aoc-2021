const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

let gammaMap = {};

const fillGamma = (line) => line.split('').map((val, i) => {
    if (!gammaMap[i]) gammaMap[i] = [0, 0];
    gammaMap[i][val]++;
});

const getValue = {
    max: arr => arr[0] > arr[1] ? 0 : 1,
    min: arr => arr[0] <= arr[1] ? 0 : 1,
}
const getRate = (type) => Object.values(gammaMap)
    .reduce((res, val) => res + getValue[type](val), '')

inputData.map(fillGamma);
const gammaRate = Number.parseInt(getRate('max'), 2);
const epsilonRate = Number.parseInt(getRate('min'), 2);

console.log(gammaRate * epsilonRate);

const refillGamma = (lines) => {
    gammaMap = {};
    lines.map(fillGamma)
};

const getRating = (type) => inputData[0].split('').reduce((res, _, i) => {
    if (res.length === 1) return res;
    refillGamma(res);
    return res.filter(line => line[i] == getValue[type](gammaMap[i]))
}, inputData);

const oxygen = Number.parseInt(getRating('max')[0], 2);
const co2 = Number.parseInt(getRating('min')[0], 2);

console.log(oxygen * co2);