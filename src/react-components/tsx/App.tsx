import React from 'react';
import Header from './Header.tsx';
import CourseTable from './CourseTable.tsx';
import GpaLabel from './GpaLabel.tsx';
import Button from './Button.tsx';
import Form from './Form.tsx';
import Summary from './Summary.tsx';

import { calculateScore } from '../../scripts/Utils.ts';
import { compareGrade, compareModuleCode } from '../../scripts/Sort_util.ts';
import ModuleData from '../../scripts/ModuleData.ts';

import { Module, ModuleFilter } from '../../Types.ts'
import { DEFAULT_FILTER } from '../../Constants.ts';

import '../css/App.css';

const App = () => {
    // states
    const [data, setData] = React.useState<Module[]>([]);
    const [score, setScore] = React.useState((0).toFixed(2));
    const [showForm, setShowForm] = React.useState(false);
    const [showSummary, setShowSummary] = React.useState(false);
    const [filterFunc, setFilter] = React.useState<ModuleFilter>(() => DEFAULT_FILTER);

    // initialize variables
    const moduleData = React.useMemo(() => new ModuleData(), []);
    
    // components
    const rawGradeButton = <Button className='rawGrades' label='Load Raw'  onClick={() => setData(moduleData.getRawList())}/>;
    const withSuButton   = <Button className='withSU'    label='Load SU'   onClick={() => setData(moduleData.getSuList())}/>;
    const filterButton   = <Button className='filter'    label='Filter By' onClick={() => setShowForm(!showForm)}/>;
    const filterForm  = <Form className={showForm ? 'filterForm-visible' : 'filterForm-collapse'} setFilter={setFilter}/>;
    const summaryLabel = <label id='summaryLabel' onClick={() => setShowSummary(!showSummary)}>Summary Report</label>;
    const recordTable = <CourseTable list={data.filter(filterFunc)}
                            moduleFunc={() => setData([...data.sort(compareModuleCode)])}
                            gradeFunc={() => setData([...data.sort(compareGrade)])}/>;

    // effects
    React.useEffect(() => {
        setScore(calculateScore(data));
    }, data);

    return <>
        <Header/>
        <div className='utilRow'>
            {rawGradeButton}
            {withSuButton}
            {filterButton}
            {summaryLabel}
            <GpaLabel num={score}/>
        </div>
        {filterForm}
        {recordTable}
        {showSummary && <Summary/>}
    </>
}

export default App;