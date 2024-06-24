/* 
true:  row1 bigger than row2
false: row1 equal to or less than row2
*/

const identity = (x,y) => 0; // Does not change the order of x and y.

const compareGrade = (row1, row2) => {
    let x = row1[3];
    let y = row2[3];

    if (x[0] != y[0] || x === y) { // different letter grade or exactly equal
        return (x[0] < y[0]) ? -1 : 1;
    }

    return (x[1] === "+") || (y[1] === "-") ? -1 : 1; // compare by suffix
}

const compareCode = (row1, row2) => {
    let x = row1[2];
    let y = row2[2];
    return (x > y) ? 1 : -1;
}

export {identity, compareCode, compareGrade};