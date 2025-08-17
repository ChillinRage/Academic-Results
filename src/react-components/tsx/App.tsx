import React from 'react';
import Header from './Header.tsx';
import CourseTable from './CourseTable.tsx';
import GpaLabel from './GpaLabel.tsx';
import Form from './Form.tsx';
import Summary from './Summary.tsx';

import { calculateScore} from '../../scripts/Utils.ts';
import { fetchData } from '../../scripts/ModuleData.ts';

import { Module, ModuleFilter } from '../../Types.ts'
import { DEFAULT_FILTER } from '../../Constants.ts';

import '../css/App.css';
import ModuleContainer from './ModuleContainer.tsx';

const App = () => {
    // states
    const [isOlderVersion, setIsOlderVersion] = React.useState<boolean>(false);
    const [moduleList, setModuleList] = React.useState<Module[]>([]);
    const [tableData, setTableData] = React.useState<Module[]>([]);
    const [showForm, setShowForm] = React.useState(false);
    const [showSummary, setShowSummary] = React.useState(false);
    const [filterFunc, setFilter] = React.useState<ModuleFilter>(() => DEFAULT_FILTER);

    const updateTableData = () => {
        const sortedModuleList = moduleList.toSorted((mod1, mod2) => mod1.moduleCode > mod2.moduleCode ? 1 : -1);
        setTableData(sortedModuleList.map(module => {
            return {...module, grade: module.su || module.grade}
            }).filter(filterFunc));
        }

    // effects
    React.useEffect(() => {
        setModuleList(JSON.parse(localStorage.getItem('data') || '[]'));

        fetchData()
        .then(data => {
            if (localStorage.getItem('last-modified') === data.last_modified)  // cache up to date
                return;

            setModuleList(data.module_list);
            localStorage.setItem('data', JSON.stringify(data.module_list));
            localStorage.setItem('last-modified', data.last_modified); 
        });
    }, []);

    React.useEffect(updateTableData, [filterFunc, moduleList]);
    
    // components

    const filterButton = <button
        className='filter'
        onClick={() => setShowForm(!showForm)}
    >Filter</button>;

    const tableButton = <button
        onClick={() => setIsOlderVersion(!isOlderVersion)}
    >toggle</button>;

    const filterForm = <Form
        className={showForm ? 'filterForm-visible' : 'filterForm-collapse'}
        id='filterForm'
        setFilter={setFilter}
        />;

    const summaryLabel = <label
        id='summaryLabel'
        onClick={() => setShowSummary(!showSummary)}
        >Summary Report</label>;

    const moduleContainer = <ModuleContainer tableData={tableData}/>;
    const courseTable = <CourseTable tableData={tableData} setTableData={setTableData}/>;

    return <>
        <Header/>
        <div className='utilRow'>
            {filterButton}
            {summaryLabel}
            <GpaLabel num={calculateScore(tableData)}/>
        </div>

        {filterForm}
        {moduleContainer}
        {showSummary && <Summary setModal={setShowSummary} moduleList={moduleList}/>}
    </>
}

export default App;