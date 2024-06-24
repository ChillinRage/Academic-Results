import React from 'react';
import Button from './Button.tsx';
import Logic from '../../scripts/Logic.js';
import '../css/Form.css';

interface Props {
    className: string,
    logic: Logic;
}

const Form = ({className, logic} : Props) => {
    // Ensure input (for number) doesn't exceed range.
    function checkValue(input : HTMLInputElement) {
        const min = parseInt(input.min);
        const max = parseInt(input.max);
        const value = parseInt(input.value);
        if (value > max) {
            input.value = String(max);
        } else if (value < min) {
            input.value = String(min);
        }
    }

    function resetForm(form : HTMLFormElement) {
        form.reset();
        logic.resetFilter();
    }

    function submitForm(form : HTMLFormElement) {
        const filterData = {
            "year": form.year.value,
            "semester": form.semester.value,
            "module": form.module.value,
            "grade": form.grade.value,
            "unit": form.unit.value
        }

        logic.setFilter(filterData);
    }

    return <form className={className}>
        <label htmlFor="year">Year</label>
        <select id="year" name="year" >
            <option value="">--blank--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

        <label htmlFor="semester">Semester</label>
        <select id="semester" name="semester" >
            <option value="">--blank--</option>
            <option value="1">1</option>
            <option value="2">2</option>
        </select>

        <label htmlFor="module">Module</label>
        <input type="text" id="module" name="module"></input>

        <label htmlFor="grade">Grade</label>
        <select id="grade" name="grade" >
            <option value="">--blank--</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="D+">D+-</option>
            <option value="D">D</option>
            <option value="F">F</option>
            <option value="S">S</option>
            <option value="U">U</option>
        </select>

        <label htmlFor="unit">Unit</label>
        <input type="number" id="unit" name="unit" min="0" max="50" 
         onInput={sender => checkValue(sender.currentTarget)}></input>

        <Button className="reset" label="reset" onClick={sender => resetForm(sender.target.parentNode)}/>
        <Button className="submit" label="submit" onClick={sender => submitForm(sender.target.parentNode)}/>
    </form>
}

export default Form;