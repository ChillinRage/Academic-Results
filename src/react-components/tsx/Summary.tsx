import React from 'react';
import { getCumulativeReport, getGradeReport } from '../../scripts/Report_utils.ts';
import { Module } from '../../Types.ts';
import '../css/Summary.css';

interface Report {
    date: string,
    units: number,
    unitDiff: number,
    score: string,
    scoreDiff: string,
}

interface Props {
    moduleList: Module[],
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Summary = ({moduleList, setModal} : Props) => {
  const handleClose = () => setModal(false);

  const gradeReport = <h3>{getGradeReport(moduleList)}</h3>

  return <div id='summaryModal'>
    <button className="close-button" onClick={handleClose}>X</button>
    <h1 className='title'><u>Progress (work in progress)</u></h1>
    <h2 className='report-header'>Academic Year & Semester | Cumulative Units | Cumulative GPA</h2>

    {getCumulativeReport(moduleList).map(report =>
      <h3 className='report-row'>
        {report.date}  &nbsp;|
        &nbsp; {report.units} (+{report.unitDiff})  &nbsp;|
        &nbsp; {report.score} ({report.scoreDiff})
      </h3>)}
    {gradeReport}
  </div>
}

export default Summary;