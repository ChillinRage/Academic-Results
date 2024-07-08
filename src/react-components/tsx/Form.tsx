import React from 'react';
import Button from './Button.tsx';

import { createFilter } from '../../scripts/Filter_util.ts';

import { ModuleFilter, ModuleCriteria } from '../../Types.ts';
import { DEFAULT_FILTER } from '../../Constants.ts';

import '../css/Form.css';

interface Props {
    className: string,
    setFilter: React.Dispatch<React.SetStateAction<ModuleFilter>>; // set useState
}

const Form = ({className, setFilter} : Props) => {
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

    function resetForm(form : HTMLFormElement): void {
        form.reset();
        setFilter(() => DEFAULT_FILTER);
    }

    function submitForm(form : HTMLFormElement): void {
        const filterData: ModuleCriteria = {};

        if (form.year.value != '') filterData.year = parseInt(form.year.value);
        if (form.semester.value != '') filterData.semester = parseInt(form.semester.value);
        if (form.moduleCode.value != '') filterData.moduleCode = form.moduleCode.value;
        if (form.grade.value != '') filterData.grade = form.grade.value;
        if (form.unit.value != '') filterData.unit = parseInt(form.unit.value);
        if (form.remark.value != '') filterData.remark = form.remark.value;

        const newFilter: ModuleFilter = createFilter(filterData);
        setFilter(() => newFilter);
    }

    return <form className={className}>
        <label htmlFor="year">Year</label>
        <select id="year" name="year" >
            <option value=''>--blank--</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
        </select>

        <label htmlFor="semester">Semester</label>
        <select id="semester" name="semester" >
            <option value=''>--blank--</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
        </select>

        <label htmlFor='moduleCode'>Module</label>
        <input type='text' id='moduleCode' name='module'></input>

        <label htmlFor='grade'>Grade</label>
        <select id='grade' name='grade' >
            <option value=''>--blank--</option>
            <option value='A+'>A+</option>
            <option value='A'>A</option>
            <option value='A'>A-</option>
            <option value='B'>B+</option>
            <option value='B'>B</option>
            <option value='B'>B-</option>
            <option value='C'>C+</option>
            <option value='C'>C</option>
            <option value='D'>D+-</option>
            <option value='D'>D</option>
            <option value='F'>F</option>
            <option value='S'>S</option>
            <option value='U'>U</option>
        </select>

        <label htmlFor="unit">Unit</label>
        <input type="number" id="unit" name="unit" min="0" max="50"
         onInput={sender => checkValue(sender.currentTarget)}/>

         <label htmlFor='remark'>Remark</label>
         <input type='text' id='remark' name='remark'/>

        <Button className="reset" label="reset" onClick={sender => resetForm(sender.target.parentNode)}/>
        <Button className="submit" label="submit" onClick={sender => submitForm(sender.target.parentNode)}/>
    </form>
}

export default Form;