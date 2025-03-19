import React from 'react'
import { Module } from '../../Types'
import ModuleModal from './ModuleModal.tsx'
import '../css/ModuleCard.css';

interface Props {
  module: Module,
  modalSetter: React.Dispatch<React.SetStateAction<Module | undefined>>,
}

const ModuleCard = ({module, modalSetter} : Props) => {
  return <>
    <div className='module-card' onClick={() => modalSetter(module)}>
      <h3 className='module-code'>{module.moduleCode}</h3>
      <h3 className='module-grade'>{module.grade}</h3>
    </div>
  </>;
}

export default ModuleCard;