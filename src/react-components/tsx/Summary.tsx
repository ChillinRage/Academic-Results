import React from 'react';
import { createFilter, orFilter } from '../../scripts/Filter_util.ts';
import { calculateScore } from '../../scripts/Utils.ts';
import { Module } from '../../Types.ts';
import '../css/Summary.css';

interface Report {
    date: string,
    units: number,
    score: string,
}

interface Props {
    moduleList: Module[],
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Summary = ({moduleList, setModal} : Props) => {
  const handleClose = () => setModal(false);

  return <div id='summaryModal'>
    <button className="close-button" onClick={handleClose}>X</button>
    <h1 className='title'><u>Progress (work in progress)</u></h1>
    <h2 className='report-header'>Academic Year & Semester | Cumulative Units | Cumulative GPA</h2>

    {generateReport(moduleList).map(report =>
      <h3 className='report-row'>{report.date} | {report.units} | {report.score}</h3>)}
  </div>
}

function generateReport(moduleList: Module[]): Report[] {
  const reports: Report[] = [];
  let filterFunc = (module: Module) => false;

  for (let year = 1; year < 5; year++) {
    for (let semester = 1; semester < 3; semester++) {
      const newFilter = createFilter({year, semester});
      if (moduleList.filter(newFilter).length === 0) break;

      filterFunc = orFilter(newFilter, filterFunc);
      const filteredList = moduleList.filter(filterFunc);

      const date = `AY${21+year}/${22+year} S${semester}`;
      const units = filteredList.reduce((acc, current) => acc + current.unit, 0);
      const score = calculateScore(filteredList, true);

      reports.push({date, units, score});
    }
  }
  return reports;
}


export default Summary;