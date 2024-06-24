import React from 'react';
import '../css/CourseTable.css';

interface Props {
    list: string[],
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
            {list.map(row => (
                <tr>
                    <td className="smallColumn">{row[0]}</td>
                    <td className="smallColumn">{row[1]}</td>
                    <td className="bigColumn">{row[2]}</td>
                    <td className="smallColumn">{row[3]}</td>
                    <td className="smallColumn">{row[4]}</td>
                    <td className="bigColumn">{row[5]}</td>
                </tr>
            ))}
        </tbody>
    </table>;
}

export default CourseTable;