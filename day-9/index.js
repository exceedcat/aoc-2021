const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n').map(v => v.split(''));

const getAdjacentCoords = (x, y) => {
    const top = y - 1 >= 0 ? [x, y - 1] : null;
    const bottom = y + 1 < inputData.length ? [x, y + 1] : null;
    const left = x - 1 >= 0 ? [x - 1, y] : null;
    const right = x + 1 < inputData[0].length ? [x + 1, y] : null;

    return [top, bottom, left, right].filter(a => !!a);
}

let riskLevels = 0;

const findLowPoints = () => {
    for (let y = 0; y < inputData.length; y++) {
        for (let x = 0; x < inputData[0].length; x++) {
            const adjacentCoords = getAdjacentCoords(x, y);
            const value = +inputData[y][x];
            const adjacentValues = adjacentCoords.map(([x1, y1]) => +inputData[y1][x1]);
            const isMin = adjacentValues.every(v => value < v);
            if (isMin) riskLevels += value + 1
        }
    }
}
findLowPoints();
console.log(riskLevels)