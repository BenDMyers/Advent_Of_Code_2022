var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var fs = require('fs');
var lines = fs
    .readFileSync("".concat(__dirname, "/.input"), 'utf-8')
    .split('\n');
var elves = lines.reduce(function (elves, line) {
    var currentElfIndex = elves.length - 1;
    var currentElf = elves[currentElfIndex];
    if (line === '') {
        currentElf = [];
        elves.push(currentElf);
    }
    else {
        var calories = Number.parseInt(line);
        currentElf.push(calories);
    }
    return elves;
}, [[]]);
// Part 1
function sum(arr) {
    return arr.reduce(function (total, addend) { return (total + addend); }, 0);
}
var totalCalories = elves.map(sum);
var maxCalories = Math.max.apply(Math, totalCalories);
console.log(maxCalories);
// Part 2
function byCalories(elfA, elfB) {
    return elfB - elfA;
}
var elvesByCalories = __spreadArray([], totalCalories, true).sort(byCalories);
var first = elvesByCalories[0], second = elvesByCalories[1], third = elvesByCalories[2];
console.log(first + second + third);
