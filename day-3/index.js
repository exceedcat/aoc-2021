const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

let gammaMap = {};

const fillGamma = (line) => line.split('').map((val, i) => {
    if (!gammaMap[i]) gammaMap[i] = [0, 0];
    gammaMap[i][val]++;
})

inputData.map(fillGamma);
const gammaRate = Number.parseInt(
    Object.values(gammaMap)
        .reduce((res, val) => res + val.indexOf(Math.max(...val)), '')
    , 2);
const epsilonRate = Number.parseInt(
    Object.values(gammaMap)
        .reduce((res, val) => res + val.indexOf(Math.min(...val)), '')
    , 2);

console.log(gammaRate * epsilonRate);

const refillGamma = (lines) => {
    gammaMap = {};
    lines.map(fillGamma)
};

debugger;

let oxygenLines = [...inputData];
for (let i = 0; i < inputData[0].length; i++) {
    if (oxygenLines.length == 1) break;
    refillGamma(oxygenLines);
    const max = gammaMap[i][0] > gammaMap[i][1] ? 0 : 1;
    oxygenLines = oxygenLines.filter(line => line[i] == max);
}
const oxygen = Number.parseInt(oxygenLines[0], 2);

let co2Lines = [...inputData];
for (let i = 0; i < inputData[0].length; i++) {
    if (co2Lines.length == 1) break;
    refillGamma(co2Lines);
    const min = gammaMap[i][0] <= gammaMap[i][1] ? 0 : 1;
    co2Lines = co2Lines.filter(line => line[i] == min);
}
const co2 = Number.parseInt(co2Lines[0], 2);

console.log(oxygen * co2);