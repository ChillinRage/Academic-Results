export type Module = {
    index: number,
    year: number,
    semester: number,
    moduleCode: string,
    grade: Grade,
    unit: number,
    remark: String,
    su?: Grade,
}

export type Grade = 'A' | 'A+' | 'A-' | 'B' | 'B+' | 'B-' | 'C' | 'C+' | 'D' | 'D+' | 'F' | 'S' | 'U';

export type ModuleFilter = (module: Module) => boolean;

export type ModuleCriteria = {
    year?: number,
    semester?: number,
    moduleCode?: string,
    grade?: Grade,
    unit?: number,
    remark?: string,
};

export type ModuleSort = (module1: Module, module2: Module) => number;
