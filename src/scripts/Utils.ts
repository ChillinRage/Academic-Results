import { GRADE_VALUE } from '../Constants.ts';
import { Module, Grade } from '../Types.ts';

const getGradeValue = (grade: Grade): number => GRADE_VALUE[grade];

export function calculateScore(moduleList: Module[]): string {
    let total_units = 0;
    let points = 0;

    moduleList.forEach(module => {
        total_units += module.unit;
        points += getGradeValue(module.grade) * module.unit;
        if (module.grade === 'S' || module.grade === 'U') {
            total_units -= module.unit;
        }
    });

    return (total_units > 0)
        ? (points / total_units).toFixed(2)
        : (0).toFixed(2);
}

export function stringToModule(moduleString: string): Module {
    const stringList = moduleString.split(',');

    const newModule = {
        year: parseInt(stringList[0]),
        semester: parseInt(stringList[1]),
        moduleCode: stringList[2],
        grade: <Grade> stringList[3],
        unit: parseInt(stringList[4]),
        remark: stringList[5],
        hasSU: stringList[6] === 'true',
    }

    return newModule;
};

export function moduleToSu(module: Module): Module {
    const failGrades = ['D+', 'D', 'F'];
    const newModule = {...module};
    if (newModule.hasSU) {
        newModule.grade = failGrades.includes(newModule.grade)
            ? 'U'
            : 'S';
    }
    return newModule;
}
