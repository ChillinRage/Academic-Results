import { getURL } from './Firebase.ts';
import { stringToModule, moduleToSu } from './Utils.ts';
import { Module } from '../Types.ts';

const SAMPLE_DATA = [
  "year,semester,module,grade,unit,remark,su",
  "1,1,ABC1234,B+,4,Sample",
  "1,2,MOE7211,C+,2,Sample SU,S",
  "2,2,DEF5678,A,4,SAMPLE",
  "3,1,CODE7211,A-,4,Something here",
  "4,2,FINAL4420,A+,6,",
  "UNDEFINED ROW TO BE REMOVED"
];

export async function fetchModuleList(): Promise<Module[]> {
  const stringList = await getURL()
    .then(url => fetch(url))                    // fetch data
    .then(response => response.text())          // process data
    .then(raw_data => raw_data.split('\r\n'))   // split into rows
    .catch(err => {
      alert("ERROR: Unable to fetch data!\nUsing sample data instead.");
      return [...SAMPLE_DATA];
  });

  stringList.shift();  // remove header
  stringList.pop();    // remove undefined row

  return stringList.map((module, i) => stringToModule(i, module));
}
