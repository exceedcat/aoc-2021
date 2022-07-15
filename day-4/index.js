const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n\n');

let [[numbers], ...boards] = inputData.map(data => data.split('\n'));
numbers = numbers.split(',')
boards = boards.map(b => b
    .map(line => line.split(' ')
        .filter(l => !!l)
        .map(v => ({ value: v, marked: false }))
    )
)

const checkNum = (num) => {
    boards = boards.map(
        board => board.map(
            line => line.map(
                i => ({
                    value: i.value,
                    marked: i.marked || i.value === num
                })
            )
        )
    )
}

let finNum = undefined;
let winInd = -1;
let winners = new Set();
const findWinner = (num) => {
    boards.map(
        (board, ind) => {
            const linesWinner = !!board.filter(
                line => line.reduce((res, i) => res && i.marked, true)
            ).length;
            const colsWinner = board[0].map(
                (_, i) => board.reduce((res, line) => res && line[i].marked, true)
            ).find((v) => v == true);

            if (linesWinner || colsWinner) {
                winInd = ind;
                winners.add(ind)
                if (finNum === undefined) finNum = num;
            }
        }
    )
    return winInd;
}

const calcScore = (board) => {
    const sumUnmarked = board.flat().reduce((res, val) => res + (val.marked ? 0 : +val.value), 0);
    console.log(sumUnmarked * +finNum);
}

for (let i = 0; i < numbers.length; i++) {
    checkNum(numbers[i]);
    const win = findWinner(numbers[i]);
    if (win !== -1) {
        if (winners.size === boards.length) {
            finNum = numbers[i];
            break;
        }
    }
}
// console.log(winners);
const indLast = [...winners].pop()
console.log(indLast);
console.log(finNum);
calcScore(boards[indLast]);