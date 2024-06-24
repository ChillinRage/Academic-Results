class Data {
    #rawData = [];
    #suData = [];

    constructor() {
        this.#updateData();
    }

    // retrieve data from csv file
    async #fetchData() {
        const url = 'https://raw.githubusercontent.com/ChillinRage/Academic-Results/gh-pages/data/Acad%20results.csv';
        const response = await fetch(url);       // fetch data
        const raw_data = await response.text();  // process data
        const rows     = raw_data.split('\n'); // split into rows
        return rows;
    }

    async #updateData() {
        const rawData = await this.#fetchData();
        const header  = rawData.shift().split(',');
        rawData.pop(); // remove undefined row
        
        const fail = ["D+","D","F"];
        const suData = [];

        // convert each string row into array
        for (let i = 0; i < rawData.length; i++) {
            rawData[i] = rawData[i].split(',');
            suData[i] = [...rawData[i]];
            if (JSON.parse(suData[i][6])) {
                if (fail.includes(suData[i][3])) {
                    suData[i][3] = "U";
                } else {
                    suData[i][3] = "S";
                }
            }
        }

        this.#rawData = rawData;
        this.#suData = suData;
    }

    getRawData() {
        return [...this.#rawData];
    }

    getSuData() {
        return [...this.#suData];
    }
}

export default Data;

// retrieve data from HTML table
function readData() {
    const table = document.getElementsByClassName("recordTable");
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