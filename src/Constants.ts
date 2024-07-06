import { Grade, ModuleFilter } from "./Types.ts";

export const GRADE_LIST: Grade[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D+', 'D', 'F', 'S', 'U'];

export const GRADE_VALUE: { [key in Grade]: number } = {
    'A+': 5,   'A': 5,   'A-': 4.5,
    'B+': 4,   'B': 3.5, 'B-': 3,
    'C+': 2.5, 'C': 2.0,
    'D+': 1.5, 'D': 1,
    'F': 0,    'S': 0,   'U': 0,
};

export const DEFAULT_FILTER: ModuleFilter = module => true;