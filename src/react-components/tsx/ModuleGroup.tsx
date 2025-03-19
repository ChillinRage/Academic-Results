import React from 'react'
import { Module } from '../../Types'
import ModuleCard from './ModuleCard.tsx';
import '../css/ModuleGroup.css';

interface Props {
  groupTitle: string,
  groupModule: Module[],
  modalSetter: React.Dispatch<React.SetStateAction<Module | undefined>>
}

const ModuleGroup = ({groupTitle, groupModule, modalSetter} : Props) => {

  const moduleCards = groupModule.map(module =>
    <ModuleCard module={module} modalSetter={modalSetter}/>
  )

  return <div className='module-group'>
    <h2 style={{userSelect: 'none'}}>{groupTitle}</h2>
    {moduleCards}
  </div>;
}

export default ModuleGroup;