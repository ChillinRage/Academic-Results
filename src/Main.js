import {getRawData, getSuData} from './Data.js';
import {compareCode, compareGrade} from './Sort.js';
import {Ui} from './Ui.js';

class Main {
    constructor(ui) {
        this.ui = ui;
        this.rawData = null;
        this.suData = null;

        getRawData().then(data => {
            this.rawData = data;
        });
        getSuData().then(data => {
            this.suData = data;
            this.ui.loadData(this.suData);
        });
    }

    bindButtons() {
        const rawGradesButton = document.getElementById("rawGrades");
        const SuButton = document.getElementById("withSU");
        rawGradesButton.addEventListener("click", () => ui.loadData(this.rawData));
        SuButton.addEventListener("click", () => ui.loadData(this.suData));
        
        const moduleButton = document.getElementById("moduleHead");
        const gradeButton = document.getElementById("gradeHead");
        moduleButton.addEventListener("click", () => this.ui.sortBy(compareCode));
        gradeButton.addEventListener("click", () => this.ui.sortBy(compareGrade));
    }

    update() {
        this.ui.display();
    }
}

const ui = new Ui();
const main = new Main(ui);
main.bindButtons();

/* ====================================================== */
/* ====================================================== */
// FOR MODALS
var modal = document.getElementById("ProgressModal");

const showModal = () => modal.style.display = "block";
const hideModal = () => modal.style.display = "none";