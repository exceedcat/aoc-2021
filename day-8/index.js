const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n').map(v => v.split(' | '));

const numbersArr = {
    0: 'abcefg',
    1: 'cf', // +
    2: 'acdeg', // +
    3: 'acdfg',
    4: 'bcdf', // +
    5: 'abdfg',
    6: 'abdefg', // +
    7: 'acf', // +
    8: 'abcdefg', // +
    9: 'abcdfg', // +
}
const mapNumbers = (line) => {
    const finalMap = {};
    const possibleMap = {};
    const numbers = line.split(' ');
    // console.log(numbers);

    // fill for 1
    const one = numbers.find(n => n.length === 2);
    one.split('').map(l => {
        possibleMap.c = [...(possibleMap.c || []), l]
        possibleMap.f = [...(possibleMap.f || []), l]
    })
    // fill for 7 to find out a
    const seven = numbers.find(n => n.length === 3)
    seven
        .split('')
        .filter(l => one.indexOf(l) === -1)
        .map(l => {
            possibleMap.a = [l];
            finalMap.a = l;
        })
    // fill for 4
    const four = numbers.find(n => n.length === 4)
    four
        .split('')
        .filter(l => Object.values(possibleMap).flat().indexOf(l) === -1)
        .map(l => {
            possibleMap.b = [...(possibleMap.b || []), l]
            possibleMap.d = [...(possibleMap.d || []), l]
        })
    // find and fill for 9 (it adds 'g' to our map)
    const nine = numbers
        .find(n => n.length === numbersArr[9].length
            && four
                .split('')
                .reduce((res, curr) => n.indexOf(curr) !== -1 && res, true)
        );
    const g = nine.split('').find(l => l !== finalMap.a && four.indexOf(l) === -1)
    finalMap.g = g;
    possibleMap.g = [g];
    // find and fill for 6 (it adds 'e' to our map)
    const six = numbers.find(n => n.length === numbersArr[6].length && n !== nine);
    const e = six.split('').find(l => {
        return l !== finalMap.a
            && l !== finalMap.g
            && possibleMap.b.indexOf(l) == -1
            && possibleMap.f.indexOf(l) == -1
    })
    finalMap.e = e;
    possibleMap.e = [e];
    // find and fill for 2 (it adds 'c' and 'd' to our map)
    const two = numbers.find(n => n.length === numbersArr[2].length
        && n.indexOf(finalMap.a) !== -1
        && n.indexOf(finalMap.g) !== -1
        && n.indexOf(finalMap.e) !== -1);
    const c = possibleMap.c.find(v => two.indexOf(v) !== -1);
    finalMap.c = c;
    possibleMap.c = [c]
    const f = possibleMap.f.find(v => two.indexOf(v) === -1);
    finalMap.f = f;
    possibleMap.f = [f]

    // find and fill for 3 (it adds 'c' and 'd' to our map)
    const three = numbers.find(n => n.length === numbersArr[3].length
        && n.indexOf(finalMap.a) !== -1
        && n.indexOf(finalMap.g) !== -1
        && n.indexOf(finalMap.c) !== -1
        && n.indexOf(finalMap.e) === -1);

    const b = possibleMap.b.find(v => three.indexOf(v) === -1);
    finalMap.b = b;
    possibleMap.b = [b]
    const d = possibleMap.d.find(v => three.indexOf(v) !== -1);
    finalMap.d = d;
    possibleMap.d = [d]

    console.log(finalMap);
    return finalMap;
}

const findNumber = (map, numberText) => {
    console.log('>', numberText);
    const mappedLetters = numberText.split('')
        .map(l => Object.entries(map)
            .find(([ansLetter, ansVal]) => ansVal === l)[0]
        )
        .join('');
    console.log('>>', mappedLetters);
    const number = Object.entries(numbersArr)
        .find(([num, numLet]) => numLet.length === mappedLetters.length
            && [...new Set([...numLet.split(''), ...mappedLetters.split('')])].length === numLet.length
        )
    return number[0]
}

let sum = 0;

inputData.map(d => {
    const generatedMap = mapNumbers(d[0])
    const lineNumber = Number.parseInt(d[1].split(' ').map(n => findNumber(generatedMap, n)).join(''));
    sum += lineNumber;
})
console.log(sum);
// console.log(mapNumbers(inputData[0][0]));
// console.log(mapNumbers(inputData[1][0]));

// console.log(inputData.reduce((res, [_, v]) => res + count(v), 0));