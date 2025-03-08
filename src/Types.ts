export type Module = {
    index: number,
    year: number,
    semester: number,
    moduleCode: string,
    grade: Grade,
    unit: number,
    remark: string,
    su?: Grade,
}

export type Grade = 'A' | 'A+' | 'A-' | 'B' | 'B+' | 'B-' | 'C' | 'C+' | 'D' | 'D+' | 'F' | 'S' | 'U' | 'CS' | 'CU';

export type ModuleFilter = (module: Module) => boolean;

export type ModuleCriteria = {
    years?: number[],
    semesters?: number[],
    moduleCode?: string,
    grades?: Grade[],
    unit?: number,
    remark?: string,
};

export type ModuleSort = (module1: Module, module2: Module) => number;

export type CumulativeReport = {
    date: string,
    units: number,
    unitDiff: number,
    score: string,
    scoreDiff: string,
}

export type SelectOption = { value: string, label: string };

export type SelectGrade = { value: Grade, label: string};