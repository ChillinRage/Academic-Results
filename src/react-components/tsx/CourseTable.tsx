import React from 'react';
import '../css/CourseTable.css';
import { Module } from '../../Types'

interface Props {
    list: Module[],
    moduleFunc: () => void,
    gradeFunc: () => void
}

const CourseTable = ({list, moduleFunc, gradeFunc} : Props) => {

    return <table className="recordTable">
        <thead>
            <tr>
                <th className="unitColumn">Year</th>
                <th className="unitColumn">Semester</th>
                <th title="Press to sort by course code" className="moduleHead" onClick={moduleFunc}>Module</th>
                <th title="Press to sort by grades" className="gradeHead" onClick={gradeFunc}>Grade</th>
                <th className="unitColumn">Units</th>
                <th>Remark</th>
            </tr>
        </thead>

        <tbody>
            {list.map(module => (
                <tr>
                    <td className="smallColumn">{module.year}</td>
                    <td className="smallColumn">{module.semester}</td>
                    <td className="bigColumn">{module.moduleCode}</td>
                    <td className="smallColumn">{module.grade}</td>
                    <td className="smallColumn">{module.unit}</td>
                    <td className="bigColumn">{module.remark}</td>
                </tr>
            ))}
        </tbody>
    </table>;
}

export default CourseTable;