import Data from './Data.js';
import {compareCode, compareGrade} from './Sort.js';

export default class Logic {
    static DEFAULT_FILTER = subject => true;

    constructor(dataState, scoreState) {
        this.dataState = dataState;
        this.scoreState = scoreState;
        this.Data = new Data();
        this.currentList = this.Data.getSuData();
        this.filter = Logic.DEFAULT_FILTER;
    }

    updateState() {
        this.dataState(this.currentList.filter(this.filter));
        this.scoreState(this.#getScore());
    }

    displayRaw() {
        this.currentList = this.Data.getRawData();
        this.filt
        this.updateState();
    }

    displaySU() {
        this.currentList = this.Data.getSuData();
        this.updateState();
    }

    sortByCode() {
        this.currentList.sort(compareCode);
        this.updateState();
    }

    sortByGrade() {
        this.currentList.sort(compareGrade);
        this.updateState();
    }

    #getScore() {
        const GRADES = {
            "A+":5, "A":5, "A-":4.5, "B+":4, "B":3.5, "B-":3,
            "C+":2.5, "C":2, "D+":1.5, "D":1, "F":0, "S":0, "U":0
        };

        const filteredList = this.currentList.filter(this.filter);
        let total_units = 0;
        let points = 0;

        for (let i = 0; i < filteredList.length; i++) {
            const row = filteredList[i];
            total_units += parseInt(row[4]);
            points += GRADES[row[3]] * parseInt(row[4]);
            
            if (row[3] === "S" || row[3] === "U") {
                total_units -= parseInt(row[4]);
            }
        }
        
        if (total_units > 0) { 
            return (points / total_units).toFixed(2);
        } else {
            return 0.00;
        }
    }

    setFilter(criteriaList) {
        this.filter = subject => 
            (criteriaList.year == ""        || criteriaList.year == subject[0])
            && (criteriaList.semester == "" || criteriaList.semester == subject[1])
            && (criteriaList.grade == ""    || criteriaList.grade == subject[2])
            && (criteriaList.module == ""   || criteriaList.module == subject[3])
            && (criteriaList.unit == ""     || criteriaList.unit == subject[4]);

        this.updateState();
    }

    resetFilter() {
        this.filter = Logic.DEFAULT_FILTER;
        this.updateState();
    }
}