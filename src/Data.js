// retrieve data from csv file
async function fetchData() {
    const url = 'https://raw.githubusercontent.com/ChillinRage/Academic-Results/gh-pages/data/Acad%20results.csv';
    const response = await fetch(url);       // fetch data
    const raw_data = await response.text();  // process data
    const rows     = raw_data.split('\n'); // split into rows
    return rows;
}

// retrieve data from HTML table
function readData() {
    const table = document.getElementById("table");
    const rows = table.rows;
    const data = [];

    for (let i = 1; i < rows.length; i++) { // start with 1 to ignore header
        data[i - 1] = [];
        let cells = rows.item(i).cells;

        data[i-1][0] = Number(cells[0].innerHTML); // year
        data[i-1][1] = Number(cells[1].innerHTML); // sem
        data[i-1][2] = String(cells[2].innerHTML); // mod
        data[i-1][3] = String(cells[3].innerHTML); // grade
        data[i-1][4] = Number(cells[4].innerHTML); // units
        data[i-1][5] = String(cells[5].innerHTML); // remark
    }

    return data;
}

async function getRawData() {
    const data   = await fetchData();
    const header = data.shift().split(',');
    data.pop(); // remove undefined row

    // convert each string row into array
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].split(',');
    }

    return data;
}

async function getSuData() {
    const fail = ["D+","D","F"];
    const data = await getRawData();
    data.forEach(row => {
        if (JSON.parse(row[6])) {
            if (fail.includes(row[3])) {
                row[3] = "U";
            } else {
                row[3] = "S";
            }
        }
    });
    return data;
}

export {readData, getRawData, getSuData};