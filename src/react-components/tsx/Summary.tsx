import React from 'react';
import { getCumulativeReport, getGradeSummary } from '../../scripts/Report_utils.ts';
import { Module } from '../../Types.ts';
import '../css/Summary.css';

interface Props {
    moduleList: Module[],
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Summary = ({moduleList, setModal} : Props) => {
  const handleClose = () => setModal(false);

  const cumulativeTable = <table id='cumulativeTable'>
    <thead style={{textDecoration: 'none'}}>
      <tr>
        <th className='cumulativeHeader'>Year & Semester</th>
        <th className='cumulativeHeader'>Cumulative GPA</th>
        <th className='cumulativeHeader'>Cumulative Units</th>
      </tr>
    </thead>
    <tbody>
      {getCumulativeReport(moduleList).map(report =>
        <tr>
          <td className='cumulativeCell'>{report.date}</td>
          <td className='cumulativeCell'>{report.score}</td>
          <td className='cumulativeCell'>{report.units}</td>
        </tr>
      )}
    </tbody>
  </table>

  const gradeTable = <table id='gradeTable'>
    <tbody>
      <tr style={{margin: '0 auto',}}>
        {Object.entries(getGradeSummary(moduleList)).map(entry =>
          <td style={{padding: '5px 25px', border: '2px solid antiqueWhite'}}>{entry[0]}</td>
        )}
      </tr>
      <tr style={{margin: '0 auto'}}>
        {Object.entries(getGradeSummary(moduleList)).map(entry =>
          <td style={{padding: '5px 25px', border: '2px solid antiqueWhite'}}>{entry[1] as React.ReactNode}</td>
        )}
      </tr>
    </tbody>
  </table>

  return <div id='summaryModal'>
    <button className="close-button" onClick={handleClose}>X</button>
    <h1 className='title'><u>Summary</u></h1>

    {cumulativeTable}
    {gradeTable}
  </div>
}

export default Summary;