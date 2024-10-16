import React from 'react';

import { createFilter } from '../../scripts/Filter_util.ts';
import { ModuleFilter, ModuleCriteria } from '../../Types.ts';
import { DEFAULT_FILTER } from '../../Constants.ts';

import '../css/Form.css';

interface Props {
    id: string,
    className: string,
    setFilter: React.Dispatch<React.SetStateAction<ModuleFilter>>, // set useState
};

const Form = ({id, className, setFilter} : Props) => {
    const [formData, setFormData] = React.useState({
        year: '',
        semester: '',
        moduleCode: '',
        grade: '',
        unit: '',
        remark: '',
    });
    const { year, semester, moduleCode, grade, unit, remark } = formData;

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
        setFormData({
            year: '',
            semester: '',
            moduleCode: '',
            grade: '',
            unit: '',
            remark: '',
        });
        setFilter(() => DEFAULT_FILTER);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const criteria: ModuleCriteria = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value.trim() !== "")
        );

        if (criteria.year) criteria.year = Number(criteria.year);
        if (criteria.semester) criteria.semester = Number(criteria.semester);
        if (criteria.unit) criteria.unit = Number(criteria.unit);

        setFilter(() => createFilter(criteria));
    }

    return <form id={id} className={className} onSubmit={handleSubmit} onReset={handleReset}>
        <label htmlFor="year">Year</label>
        <select name="year" value={year} onChange={handleOnChange}>
            <option value=''>--blank--</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
        </select>

        <label htmlFor="semester">Semester </label>
        <select name="semester" value={semester} onChange={handleOnChange}>
            <option value=''>--blank--</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
        </select>

        <label htmlFor='moduleCode'>Module</label>
        <input type='text' name='moduleCode' value={moduleCode} onChange={handleOnChange}></input>

        <label htmlFor='grade'>Grade</label>
        <select name='grade' value={grade} onChange={handleOnChange}>
            <option value=''>--blank--</option>
            <option value='A+'>A+</option>
            <option value='A'>A</option>
            <option value='A-'>A-</option>
            <option value='B+'>B+</option>
            <option value='B'>B</option>
            <option value='B-'>B-</option>
            <option value='C+'>C+</option>
            <option value='C'>C</option>
            <option value='D+'>D+</option>
            <option value='D'>D</option>
            <option value='F'>F</option>
            <option value='S'>S</option>
            <option value='U'>U</option>
        </select>

        <label htmlFor="unit">Unit</label>
        <input type="number" name="unit" value={unit} onChange={handleOnChange}/>

        <label htmlFor='remark'>Remark</label>
        <input type='text' name='remark' value={remark} onChange={handleOnChange}/>

        <button type='reset'>reset</button>
        <button type="submit">submit</button>
    </form>
}

export default Form;