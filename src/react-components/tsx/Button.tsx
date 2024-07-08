import React from 'react';
import '../css/Button.css';

interface Props {
    className: string,
    label: string,
    onClick: (arg0: any) => any
}

const Button = ({className, label, onClick} : Props) => {
    return <button type="button" className={className} onClick={onClick}>{label}</button>;
}

export default Button;