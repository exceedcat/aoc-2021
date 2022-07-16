const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split(',');

let fishMap = {};

const initMap = () => inputData.map(f => fishMap[f] = (fishMap[f] || 0) + 1)

initMap();

const calcNextDay = (fishMap) => {
    const nextMap = {};

    Object.entries(fishMap).reverse().map(([day, count]) => {
        if (+day === 0) {
            nextMap[6] = (nextMap[6] || 0) + count;
            nextMap[8] = (nextMap[8] || 0) + count;
        } else {
            nextMap[day - 1] = (nextMap[day - 1] || 0) + count;
        }
    });

    return nextMap;
}

for (let i = 0; i < 256; i++) {
    fishMap = calcNextDay(fishMap)
    console.log(i, '>', Object.values(fishMap).reduce((res, v) => res + v, 0));
}