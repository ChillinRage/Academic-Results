import React from 'react';
import Header from './Header.tsx';
import CourseTable from './CourseTable.tsx';
import GpaLabel from './GpaLabel.tsx';
import Form from './Form.tsx';
import Summary from './Summary.tsx';

import { calculateScore} from '../../scripts/Utils.ts';
import { fetchModuleList } from '../../scripts/ModuleData.ts';

import { Module, ModuleFilter } from '../../Types.ts'
import { DEFAULT_FILTER } from '../../Constants.ts';

import '../css/App.css';

const App = () => {
    // states
    const [moduleList, setModuleList] = React.useState<Module[]>([]);
    const [tableData, setTableData] = React.useState<Module[]>([]);
    const [showSU, setShowSU] = React.useState<Boolean>(true);
    const [showForm, setShowForm] = React.useState(false);
    const [showSummary, setShowSummary] = React.useState(false);
    const [filterFunc, setFilter] = React.useState<ModuleFilter>(() => DEFAULT_FILTER);

    const updateTableData = () => {
        setTableData(moduleList.map(module => {
            return {...module, grade: (showSU && module.su) || module.grade}
            }).filter(filterFunc));
        }

    // effects
    React.useEffect(() => {
        setModuleList(JSON.parse(localStorage.getItem('data') || '[]'));

        fetchModuleList()
        .then(moduleList => {
            if (JSON.stringify(moduleList) === localStorage.getItem('data')) // no change since last fetch
                return;
            
            localStorage.setItem('data', JSON.stringify(moduleList));
            setModuleList(JSON.parse(localStorage.getItem('data') || '[]'));
        });
    }, []);

    React.useEffect(updateTableData, [showSU, filterFunc, moduleList]);
    
    // components
    const rawGradeButton = <button
        type='button'
        className='rawGrades'
        onClick={() => setShowSU(false)}
    >Load Raw</button>;

    const withSuButton = <button
        type='button'
        className='withSU'
        onClick={() => setShowSU(true)}
    >Load SU</button>;

    const filterButton = <button
        className='filter'
        onClick={() => setShowForm(!showForm)}
    >Filter By</button>;

    const filterForm = <Form
        className={showForm ? 'filterForm-visible' : 'filterForm-collapse'}
        id='filterForm'
        setFilter={setFilter}
        />;

    const summaryLabel = <label
        id='summaryLabel'
        onClick={() => setShowSummary(!showSummary)}
        >Summary Report</label>;

    return <>
        <Header/>
        <div className='utilRow'>
            {rawGradeButton}
            {withSuButton}
            {filterButton}
            {summaryLabel}
            <GpaLabel num={calculateScore(tableData, showSU)}/>
        </div>

        {filterForm}
        <CourseTable tableData={tableData} setTableData={setTableData}/>
        {showSummary && <Summary setModal={setShowSummary} moduleList={moduleList}/>}
    </>
}

export default App;