import React from 'react'
import ModuleGroup from './ModuleGroup.tsx';
import ModuleModal from './ModuleModal.tsx'
import { Module } from '../../Types'
import '../css/ModuleContainer.css';

interface Props {
  tableData: Module[],
}

const ModuleContainer = ({tableData} : Props) => {
  const [groups, setGroups] = React.useState<Record<string | number, Module[]>>({});
  const [groupComponents, setGroupComponents] = React.useState<React.JSX.Element[]>([]);
  const [modalContent, setModalContent] = React.useState<Module | undefined>();
  const [groupCriteria, setGroupCriteria] = React.useState<(module: Module) => string>(() => 
    (module: Module) => `${module.year}${module.semester}`);
  const [criteriaTitle, setCriteriaTitle] = React.useState<(group: string) => string>(() => 
    group => `Year ${group[0]} Sem ${group[1]}`);

  React.useEffect(() => { // update display table
    setGroups({});

    tableData.forEach(module => {
      if (groups[groupCriteria(module)] === undefined)
        groups[groupCriteria(module)] = [];
  
      groups[groupCriteria(module)].push(module);
    });

    setGroupComponents(Object.entries(groups).map(entry =>
      <ModuleGroup groupTitle={criteriaTitle(entry[0])} groupModule={entry[1]} modalSetter={setModalContent}/>
    ));

  }, [tableData, groupCriteria, criteriaTitle]);

  return <div id='module-container'>
    {groupComponents}
    {modalContent && <ModuleModal module={modalContent} handleClose={() => setModalContent(undefined)}/>}
  </div>;
}

export default ModuleContainer;