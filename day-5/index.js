const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

let coords = inputData.map(data => data.split(' -> ').map(d => d.split(',')));

const xSize = coords
    .reduce((res, [[startX], [endX]]) => Math.max(startX, endX, res), 0);

const coverageMap = [];

const filteredLines = coords
    .filter(([[startX, startY], [endX, endY]]) =>
        startX == endX
        || startY == endY
        || Math.abs(startX - endX) == Math.abs(startY - endY)
    );

const fillLine = ([[startX, startY], [endX, endY]]) => {
    if (startX == endX) {
        for (let i = Math.min(startY, endY); i <= Math.max(startY, endY); i++) {
            if (!coverageMap[i]) coverageMap[i] = new Array(xSize + 1).fill(0);
            coverageMap[i][startX]++;
        }
    } else if (startY == endY) {
        for (let i = Math.min(startX, endX); i <= Math.max(startX, endX); i++) {
            if (!coverageMap[startY]) coverageMap[startY] = new Array(xSize + 1).fill(0);
            coverageMap[startY][i]++;
        }
    } else {
        let j = startX;
        let op = startX < endX ? 'i' : 'd';
        for (let i = startY; startY < endY ? i <= endY : i >= endY; startY < endY ? i++ : i--) {
            if (!coverageMap[i]) coverageMap[i] = new Array(xSize + 1).fill(0);
            coverageMap[i][j]++;
            if (op == 'i') j++
            else j--
        }
    }
}

filteredLines.map(([[startX, startY], [endX, endY]]) => fillLine([[+startX, +startY], [+endX, +endY]]));

console.log(coverageMap.flat().filter(v => v > 1).length);