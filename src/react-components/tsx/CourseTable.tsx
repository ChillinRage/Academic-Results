import React from 'react';
import '../css/CourseTable.css';
import { Module } from '../../Types'
import { compareGrade, compareModuleCode } from '../../scripts/Sort_util.ts';

interface Props {
  tableData: Module[],
  setTableData: React.Dispatch<React.SetStateAction<Module[]>>,
}

const NUSMODS_BASELINK = 'https://nusmods.com/courses/';

const CourseTable = ({tableData, setTableData} : Props) => {
  const sortByModuleCode = () => setTableData([...tableData.sort(compareModuleCode)]);
  const sortByGrade = () => setTableData([...tableData.sort(compareGrade)]);
  
  return <div className='tableContainer'>
  <table className="recordTable">
    <thead>
      <tr>
        <th className="unitColumn">Year</th>
        <th className="unitColumn">Semester</th>
        <th title="Press to sort by course code" className="moduleHead" onClick={sortByModuleCode}>Module</th>
        <th title="Press to sort by grades" className="gradeHead" onClick={sortByGrade}>Grade</th>
        <th className="unitColumn">Units</th>
        <th>Remark</th>
      </tr>
    </thead>

    <tbody>
      {tableData.map(module => (
        <tr>
          <td className='smallColumn'>{module.year}</td> 
          <td className='smallColumn'>{module.semester}</td>
          <td className='midColumn'>
            <a className='moduleLink' href={NUSMODS_BASELINK + module.moduleCode} target='_blank'>
              {module.moduleCode}
          </a></td>
          <td className='smallColumn'>{module.grade}</td>
          <td className='smallColumn'>{module.unit}</td>
          <td className='bigColumn'>{module.remark}</td>
        </tr>
      ))}
    </tbody>
</table></div>;
}

export default CourseTable;