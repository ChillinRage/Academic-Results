import React from 'react';
import Header from './Header.tsx';
import CourseTable from './CourseTable.tsx';
import GpaLabel from './GpaLabel.tsx';
import Button from './Button.tsx';
import Form from './Form.tsx';
import Summary from './Summary.tsx';

import Logic from '../../scripts/Logic.js';
import '../css/App.css';

const App = () => {
    const [data, setData] = React.useState([]);
    const [score, setScore] = React.useState((0).toFixed(2));
    const [showForm, setShowForm] = React.useState(false);
    const [showSummary, setShowSummary] = React.useState(false);
    const logic = React.useMemo(() => new Logic(setData, setScore), []);
    
    const filterForm  = <Form className={showForm ? 'filterForm-visible' : 'filterForm-collapse'} logic={logic}/>;
    const recordTable = <CourseTable list={data} moduleFunc={() => logic.sortByCode()} gradeFunc={() => logic.sortByGrade()}/>;

    const rawGradeButton = <Button className='rawGrades' label='Raw Grades' onClick={() => logic.displayRaw()}/>;
    const withSuButton   = <Button className='withSU'    label='with SU'    onClick={() => logic.displaySU()}/>;
    const filterButton   = <Button className='filter'    label='Filter By'  onClick={() => setShowForm(!showForm)}/>;

    const summaryLabel = <label id='summaryLabel' onClick={() => setShowSummary(!showSummary)}>Summary Report</label>;

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