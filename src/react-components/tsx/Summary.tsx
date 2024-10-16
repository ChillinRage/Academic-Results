import React from 'react';
import { createFilter, orFilter } from '../../scripts/Filter_util.ts';
import { calculateScore } from '../../scripts/Utils.ts';
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

  return <div id='summaryModal'>
    <button className="close-button" onClick={handleClose}>X</button>
    <h1 className='title'><u>Progress (work in progress)</u></h1>
    <h2 className='report-header'>Academic Year & Semester | Cumulative Units | Cumulative GPA</h2>

    {generateReport(moduleList).map(report =>
      <h3 className='report-row'>
        {report.date}  &nbsp;|
        &nbsp; {report.units} (+{report.unitDiff})  &nbsp;|
        &nbsp; {report.score} ({report.scoreDiff})
      </h3>)}
  </div>
}

function generateReport(moduleList: Module[]): Report[] {
  const reports: Report[] = [];
  let date, units, score, unitDiff, scoreDiff, filteredList;
  let prevUnits = 0, prevScore = 0.00;
  let filterFunc = (module: Module) => false;

  for (let year = 1; year < 5; year++) {
    for (let semester = 1; semester < 3; semester++) {
      const newFilter = createFilter({year, semester});
      if (moduleList.filter(newFilter).length === 0) break;

      filterFunc = orFilter(newFilter, filterFunc);
      filteredList = moduleList.filter(filterFunc);

      date = `AY${21+year}/${22+year} S${semester}`;
      units = filteredList.reduce((acc, current) => acc + current.unit, 0);
      score = calculateScore(filteredList, true);
      unitDiff = units - prevUnits;
      scoreDiff = parseFloat(score) - prevScore;
      scoreDiff = (scoreDiff >= 0 ? '+' : '') + scoreDiff.toFixed(2);

      reports.push({date, units, unitDiff, score, scoreDiff});
      prevUnits = units;
      prevScore = parseFloat(score);
    }
  }
  return reports;
}


export default Summary;