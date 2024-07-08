import { Module, ModuleCriteria, ModuleFilter } from '../Types.ts';

export function createFilter(criteria: ModuleCriteria): ModuleFilter {
    return (module: Module) => 
        (criteria.year === undefined            || criteria.year === module.year)
        && (criteria.semester === undefined     || criteria.semester === module.semester)
        && (criteria.grade === undefined        || criteria.grade === module.grade)
        && (criteria.moduleCode === undefined   || criteria.moduleCode.toUpperCase() === module.moduleCode)
        && (criteria.unit === undefined         || criteria.unit === module.unit)
        && (criteria.remark === undefined       || module.remark.toLowerCase().includes(criteria.remark.toLowerCase()));
};
