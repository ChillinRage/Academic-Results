import { getURL } from './Firebase.ts';
import { stringToModule } from './Utils.ts';
import { Module } from '../Types.ts';

const SAMPLE_DATA = [
  "0,1,1,ABC1234,B+,4,Sample",
  "1,1,2,MOE7211,C+,2,Sample SU,S",
  "2,2,2,DEF5678,A,4,SAMPLE",
  "3,3,1,CODE7211,A-,4,Something here",
  "4,4,2,FINAL4420,A+,6,"
];

export async function fetchData() {
  const url = await getURL();
  if (!url)
    return {
      'last_modified': 'Fri, 01 Jan 1960 00:00:00 UTC',
      'module_list': [...SAMPLE_DATA].map((module, i) => stringToModule(i, module))
    };

  const response = await fetch(url);
  const last_modified = response.headers.get('last-modified');
  const module_list = await response.text()
    .then(raw_data => raw_data.split('\r\n'))
    .then(str_list => {
      str_list.shift();   // remove header
      str_list.pop();     // remove undefined row
      return str_list.map((module, i) => stringToModule(i, module));
    });
  
  return { last_modified, module_list };
}
