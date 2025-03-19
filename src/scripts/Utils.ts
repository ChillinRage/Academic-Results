import { GRADE_VALUE, EXEMPTED_GRADES } from '../Constants.ts';
import { Module, Grade } from '../Types.ts';

const getGradeValue = (grade: Grade): number => GRADE_VALUE[grade];

export function calculateScore(moduleList: Module[]): string {
    let total_units = 0;
    let points = 0;

    moduleList.forEach(module => {
        const grade: Grade = module.su || module.grade;
        if (!EXEMPTED_GRADES.includes(grade)) {
            total_units += module.unit;
            points += getGradeValue(module.grade) * module.unit;
        }
    });

    return (total_units > 0)
        ? (points / total_units).toFixed(2)
        : (0).toFixed(2);
}

export function stringToModule(i: number, moduleString: string): Module {
    const stringList = moduleString.split(',');

    const newModule: Module = {
        id: i,
        year: parseInt(stringList[0]),
        semester: parseInt(stringList[1]),
        moduleCode: stringList[2],
        grade: <Grade> stringList[3],
        unit: parseInt(stringList[4]),
        remark: stringList[5]
    }
    if (stringList.length === 7) newModule.su = stringList[6] as Grade;

    return newModule;
};

export function moduleToSu(module: Module): Module {
    const failGrades = ['D+', 'D', 'F'];
    const newModule = {...module};
    if (newModule.su) {
        newModule.grade = failGrades.includes(newModule.grade)
            ? 'U'
            : 'S';
    }
    return newModule;
}
