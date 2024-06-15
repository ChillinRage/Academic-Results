
class Ui {
    constructor() {
        this.table = document.getElementById("table");
        this.data = null;
    }

    loadData(data) {
        this.data = data;
        this.display();
    }

    // insert a module into the table
    #insertRow(data) {
        var row    = this.table.insertRow();
        var year   = row.insertCell(0);
        var sem    = row.insertCell(1);
        var mod    = row.insertCell(2);
        var grade  = row.insertCell(3);
        var units  = row.insertCell(4);
        var remark = row.insertCell(5);

        year.className  = "unitColumn";
        sem.className   = "unitColumn";
        grade.className = "unitColumn";
        units.className = "unitColumn";

        year.innerHTML   = data[0];
        sem.innerHTML    = data[1];
        mod.innerHTML    = data[2];
        grade.innerHTML  = data[3];
        units.innerHTML  = data[4];
        remark.innerHTML = data[5];
    }

    #clearTable() {
        const rowLength = this.table.rows.length - 1;
        for (let i = 0; i < rowLength; i++) {
            table.deleteRow(1);
        }
    }

    #updateCap() {
        const len  = this.data.length;
        let total_units = 0;
        let points = 0;
        
        for (let i = 0; i < len; i++) {
            const row = this.data[i];
            total_units += JSON.parse(row[4]);
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
                case 'S': case 'U': // not considered in GPA calculation
                    total_units -= row[4];
                    break;
            }
        }
        
        if (total_units > 0) { 
            document.getElementById('cap_label').innerHTML = (points / total_units).toFixed(2);
        }
    }

    sortBy(sortFunc) {
        this.data.sort(sortFunc);
        this.display();
    }

    display() {
        this.#clearTable();
        for (let i = 0; i < this.data.length; i++) {
            this.#insertRow(this.data[i]);
        }
        this.#updateCap();
    }
}

export {Ui};