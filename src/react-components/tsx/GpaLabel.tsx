import React from 'react'
import '../css/GpaLabel.css';

interface Props {
    num: string
}

const GpaLabel = ({num} : Props) => {
    return <div className="GpaBlock">
        <label>GPA: </label>
        <label className='GpaLabel'>{num}</label> 
    </div>
}

export default GpaLabel;