import { createFilter, orFilter } from './Filter_util.ts';
import { calculateScore } from './Utils.ts';
import { Module, CumulativeReport } from '../Types.ts';
import { GRADE_LIST } from '../Constants.ts';


export function getCumulativeReport(moduleList: Module[]): CumulativeReport[] {
  const reports: CumulativeReport[] = [];
  let date, units, score, unitDiff, scoreDiff, filteredList;
  let prevUnits = 0, prevScore = 0.00;
  let filterFunc = (module: Module) => false;

  for (let year = 1; year < 5; year++) {
    for (let semester = 1; semester < 3; semester++) {
      const newFilter = createFilter({years: [year], semesters: [semester]});
      if (moduleList.filter(newFilter).length === 0) break;

      filterFunc = orFilter(newFilter, filterFunc);
      filteredList = moduleList.filter(filterFunc);

      date = `AY${21+year}/${22+year} S${semester}`;
      units = filteredList.reduce((acc, current) => acc + current.unit, 0);
      score = calculateScore(filteredList);
      unitDiff = units - prevUnits;
      scoreDiff = parseFloat(score) - prevScore;
      scoreDiff = (scoreDiff >= 0 ? '+' : '') + scoreDiff.toFixed(2);

      reports.push({date, units, unitDiff, score, scoreDiff});
      prevUnits = units;
      prevScore = parseFloat(score);
    }
  }

  return reports;
}

export function getGradeSummary(moduleList: Module[]) {
  const dict = moduleList.reduce((grades, module) => {
    grades[module.su || module.grade] = (grades[module.su || module.grade] || 0) + 1;
    return grades;
  }, {});

  // Sort in the order of grade list
  return GRADE_LIST.reduce((res, grade) => {
    if (dict[grade]) res[grade] = dict[grade];
    return res;
  }, {});
}
