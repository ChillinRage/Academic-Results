import React from 'react'
import { Module } from '../../Types'
import '../css/ModuleModal.css';

interface Props {
  module: Module,
  handleClose: () => void,
}

const ModuleModal = ({module, handleClose} : Props) => {
  const [moduleTitle, setModuleTitle] = React.useState<string>('Fetching Title...');
  const display_year = `AY${2021 + module.year}/${22 + module.year} S${module.semester}`;

  React.useEffect(() => {
    setModuleTitle('');
    const acad_year = `${2021 + module.year}-${2022 + module.year}`;
    const url = `https://api.nusmods.com/v2/${acad_year}/modules/${module.moduleCode.toUpperCase()}.json`;

    fetch(url, {method: 'GET'})
    .then(res => res.json())
    .then(moduleJson => setModuleTitle(moduleJson.title))
  }, [module]);

  return <div className='modal-container'>
    <div className="modal-header">
      <button className="modal-close-button" onClick={handleClose}>X</button>
    </div>

    <table className='module-modal'>
    <tr className='modal-row'>
      <td className='modal-label'>Module:</td>
      <td className='modal-value'>[{module.moduleCode}] <i>{moduleTitle}</i></td>
    </tr>
    <tr className='modal-row'>
      <td className='modal-label'>Grade:</td>
      <td className='modal-value'>{module.grade}</td>
    </tr>
    <tr className='modal-row'>
      <td className='modal-label'>Units:</td>
      <td className='modal-value'>{module.unit}</td>
    </tr>
    <tr className='modal-row'>
      <td className='modal-label'>Taken In:</td>
      <td className='modal-value'>{display_year}</td>
    </tr>
    <tr className='modal-row'>
      <td className='modal-label'>Remarks:</td>
      <td className='modal-value'>{module.remark}</td>
    </tr>
  </table></div>;
}
/*
<h3 className='label'>Module:</h3> <h3>[{module.moduleCode}] <i>{moduleTitle}</i></h3>
<h3 className='label'>Grade: </h3> <h3>{module.grade}</h3>
<h3 className='label'>Units:</h3> <h3>{module.unit}</h3>
<h3 className='label'>Taken In:</h3> <h3>{display_year}</h3>
<h3 className='label'>Remarks:</h3> <h3>{module.remark}</h3>
*/

export default ModuleModal;