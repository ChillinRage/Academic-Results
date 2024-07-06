import { Module, Grade, ModuleCriteria, ModuleFilter } from '../Types.ts';

export function createFilter(criteria: ModuleCriteria): ModuleFilter {
    console.log(criteria.unit);
    return module => 
        (criteria.year === undefined            || criteria.year === module.year)
        && (criteria.semester === undefined     || criteria.semester === module.semester)
        && (criteria.grade === undefined        || criteria.grade === module.grade)
        && (criteria.moduleCode === undefined   || criteria.moduleCode === module.moduleCode)
        && (criteria.unit === undefined         || criteria.unit === module.unit)
        && (criteria.remark === undefined       || module.remark.includes(<string> criteria.remark));
};
