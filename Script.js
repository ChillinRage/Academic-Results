async function get_data() {
    const url = 'https://raw.githubusercontent.com/ChillinRage/Academic-Results/gh-pages/Acad%20results.csv';
    const response = await fetch(url);       // fetch data
    const raw_data = await response.text();  // process data
    const rows     = raw_data.split('\r\n'); // split into rows
    
    return rows;
}

function read_data() {
    const table = document.getElementById("table");
    const rows = table.rows;
    const data = [];

    for (let i = 1; i < rows.length; i++) { // start with 1 to ignore header
        data[i - 1] = [];
        let cells = rows.item(i).cells;

        data[i-1][0] = Number(cells[0].innerHTML); //year
        data[i-1][1] = Number(cells[1].innerHTML); //sem
        data[i-1][2] = String(cells[2].innerHTML); //mod
        data[i-1][3] = String(cells[3].innerHTML); //grade
        data[i-1][4] = Number(cells[4].innerHTML); //mc
        data[i-1][5] = String(cells[5].innerHTML); //remark
    }

    return data;
}

function insert_row(data) {
    var table  = document.getElementById("table");
    var row    = table.insertRow();
    var year   = row.insertCell(0);
    var sem    = row.insertCell(1);
    var mod    = row.insertCell(2);
    var grade  = row.insertCell(3);
    var mc     = row.insertCell(4);
    var remark = row.insertCell(5);

    year.innerHTML   = data[0];
    sem.innerHTML    = data[1];
    mod.innerHTML    = data[2];
    grade.innerHTML  = data[3];
    mc.innerHTML     = data[4];
    remark.innerHTML = data[5];
}

function clear_table() {
    const table = document.getElementById('table');
    const rowLength = table.rows.length - 1;

    for (let i = 0; i < rowLength; i++) {
        table.deleteRow(1);
    }
}

async function update_cap() {
    const data = read_data();
    const len  = data.length;
    let total_mc = 0;
    let points   = 0;
    
    for (let i = 0; i < len; i++) {
        const row = data[i];
        total_mc += row[4];
        switch (row[3]) {
            case 'A+':
                points += (5 * row[4]);
                break;
            case 'A':
                points += (5 * row[4]);
                break;
            case 'A-':
                points += (4.5 * row[4]);
                break;
            case 'B+':
                points += (4 * row[4]);
                break;
            case 'B':
                points += (3.5 * row[4]);
                break;
            case 'B-':
                points += (3 * row[4]);
                break;
            case 'C+':
                points += (2.5 * row[4]);
                break;
            case 'C':
                points += (2 * row[4]);
                break;
            case 'D+':
                points += (1.5 * row[4]);
                break;
            case 'D':
                points += row[4];
                break;
            case 'F':
                points += 0;
                break;
            case 'S': case 'U':
                total_mc -= row[4];
                break;
        }
    }
    
    if (total_mc > 0) {
        document.getElementById('cap_label').innerHTML = (points / total_mc).toFixed(2);
    }
}

async function displayRaw() {
    const data   = await get_data();
    const header = data[0].split(',');
    const len    = data.length - 1;  //ignore extra undefined row.

    clear_table();
    for (let i = 1; i < len; i++) {
        let row = data[i].split(',');
        insert_row(row);
    }
    
    update_cap();
}

async function displaySU() {
    const data = await get_data();
    const header = data[0].split(',');
    const len = data.length - 1;

    const fail = ["D+","D","F"]
    clear_table();
    for (let i = 1; i < len; i++) {
        let row = data[i].split(',');
        if (JSON.parse(row[6])) {
            if (fail.includes(row[3])) { // U grade
                row[3] = "U";
            } else {
                row[3] = "S";
            }
        }

        insert_row(row);
    }

    update_cap();
}

displayRaw();
