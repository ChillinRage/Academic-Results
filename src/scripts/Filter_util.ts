import { Grade, Module, ModuleCriteria, ModuleFilter } from '../Types.ts';

export function createFilter(criteria: ModuleCriteria): ModuleFilter {
    return (module: Module) => 
        checkModuleYear(module.year, criteria.years)
        && checkModuleSemester(module.semester, criteria.semesters)
        && checkModuleGrade(module.grade, criteria.grades)
        && checkModuleCode(module.moduleCode, criteria.moduleCode)
        && checkModuleUnit(module.unit, criteria.unit)
        && checkModuleRemark(module.remark!, criteria.remark);
};

export function orFilter(filter1: ModuleFilter, filter2: ModuleFilter): ModuleFilter {
    return (module: Module) => filter1(module) || filter2(module);
}

export function andFilter(filter1: ModuleFilter, filter2: ModuleFilter): ModuleFilter {
    return (module: Module) => filter1(module) && filter2(module);
}

const checkModuleYear = (moduleYear: number, criteriaYears: number[] | undefined): boolean =>
    criteriaYears === undefined || criteriaYears.length === 0 || criteriaYears.includes(moduleYear);

const checkModuleSemester = (moduleSemester: number, criteriaSemesters: number[] | undefined): boolean =>
    criteriaSemesters === undefined || criteriaSemesters.length === 0 || criteriaSemesters.includes(moduleSemester);

const checkModuleGrade = (moduleGrade: Grade, criteriaGrades: Grade[] | undefined): boolean =>
    criteriaGrades === undefined || criteriaGrades.length === 0 || criteriaGrades.includes(moduleGrade);

const checkModuleCode = (moduleCode: string, criteriaCode: string | undefined): boolean =>
    criteriaCode === undefined || criteriaCode === '' || criteriaCode.includes(moduleCode.toUpperCase());

const checkModuleUnit = (moduleUnit: number, criteriaUnit: number | undefined): boolean =>
    criteriaUnit === undefined || criteriaUnit === moduleUnit;

const checkModuleRemark = (moduleRemark: string, criteriaRemark: string | undefined): boolean =>
    criteriaRemark === undefined || criteriaRemark === ''
    || criteriaRemark.toLowerCase().includes(moduleRemark.toLowerCase());
