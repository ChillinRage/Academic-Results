import React from 'react';
import Select from 'react-select';

import { createFilter } from '../../scripts/Filter_util.ts';
import { ModuleFilter, ModuleCriteria, SelectOption, SelectGrade, Module } from '../../Types.ts';
import { GRADE_LIST, DEFAULT_FILTER } from '../../Constants.ts';

import '../css/Form.css';

interface Props {
    id: string,
    className: string,
    setFilter: React.Dispatch<React.SetStateAction<ModuleFilter>>, // set useState
};

const select_style = {
    control: (base) => ({
      ...base,
      borderColor: "black",
      height: '25px',
      fontSize: '24px'
    }),
    menu: (base) => ({
      ...base,
      fontSize: '24px',
      height: '25px',
      zIndex: '100',
    }),
    option: (base, { isSelected }) => ({
      ...base,
      fontSize: '24px',
      backgroundColor: isSelected ? "lightgray" : "white",
      "&:hover": { backgroundColor: "lightblue" },
    }),
};

const Form = ({id, className, setFilter} : Props) => {
    const [year, setYear] = React.useState<SelectOption[]>([]);
    const [semester, setSemester] = React.useState<SelectOption[]>([]);
    const [moduleCode, setModuleCode] = React.useState('');
    const [grade, setGrade] = React.useState<SelectGrade[]>([]);
    const [unit, setUnit] = React.useState('');
    const [remark, setRemark] = React.useState('');

    const handleOnSelect = (setValue) => (value) => setValue(value);
    const handleOnInput = (setValue) => (event) => setValue(event.target.value);

    const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
        setYear([]);
        setSemester([]);
        setModuleCode('');
        setGrade([]);
        setUnit('');
        setRemark('');

        setFilter(() => DEFAULT_FILTER);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const criteria: ModuleCriteria = {
            years: year?.map(option => Number(option.value)),
            semesters: semester?.map(option => Number(option.value)),
            grades: grade?.map(option => option.value),
            moduleCode: moduleCode.trim(),
            remark: remark.trim(),
        };

        if (unit) criteria.unit = Number(unit);
        setFilter(() => createFilter(criteria));
    }

    return <form id={id} className={className} onSubmit={handleSubmit} onReset={handleReset}>
        <label htmlFor="year">Year</label>
        <Select
            isMulti={true}
            name='year'
            value={year}
            options={['1','2','3','4'].map(x => ({ value: x, label: x}))}
            onChange={handleOnSelect(setYear)}
            styles={select_style}
            menuPortalTarget={document.querySelector('body')}
        />

        <label htmlFor="semester">Semester </label>
        <Select
            isMulti={true}
            name='semester'
            value={semester}
            options={['1','2'].map(x => ({ value: x, label: x}))}
            onChange={handleOnSelect(setSemester)}
            styles={select_style}
            menuPortalTarget={document.querySelector('body')}
        />

        <label htmlFor='moduleCode'>Module</label>
        <input type='text' name='moduleCode' value={moduleCode} onChange={handleOnInput(setModuleCode)}></input>

        <label htmlFor='grade'>Grade</label>
        <Select
            isMulti={true}
            name='grade'
            value={grade}
            options={GRADE_LIST.map(x => ({ value: x, label: x}))}
            onChange={handleOnSelect(setGrade)}
            styles={select_style}
            menuPortalTarget={document.querySelector('body')}
        />

        <label htmlFor="unit">Unit</label>
        <input type="number" name="unit" value={unit} min={0} max={99} onChange={handleOnInput(setUnit)}/>

        <label htmlFor='remark'>Remark</label>
        <input type='text' name='remark' value={remark} onChange={handleOnInput(setRemark)}/>

        <button type='reset'>reset</button>
        <button type="submit">submit</button>
    </form>
}

export default Form;