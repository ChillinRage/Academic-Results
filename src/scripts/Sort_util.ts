import { GRADE_LIST, GRADE_VALUE } from '../Constants.ts';
import { Module, Grade, ModuleSort } from '../Types.ts';

export const compareGrade: ModuleSort = (module1, module2) =>
    GRADE_LIST.indexOf(module1.grade) - GRADE_LIST.indexOf(module2.grade);

export const compareModuleCode: ModuleSort = (module1, module2) =>
    module1.moduleCode > module2.moduleCode ? 1 : -1;
