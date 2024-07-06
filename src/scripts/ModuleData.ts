import { getURL } from './Firebase.ts';
import { stringToModule, moduleToSu } from './Utils.ts';
import { Module } from '../Types.ts';

const SAMPLE_DATA = [
    "year,semester,module,grade,unit,remark,su",
    "1,1,ABC1234,B+,4,Sample,false",
    "1,2,MOE7211,C+,2,Sample SU,true",
    "2,2,DEF5678,A,4,SAMPLE,false",
    "3,1,CODE7211,A-,4,Something here,false",
    "4,2,FINAL4420,A+,6,,false",
    ""
];

class ModuleData {
    private rawModuleList: Module[] = [];
    private suModuleList: Module[] = [];

    constructor() {
        this.fetchModuleList();
    }

    public async fetchModuleList(): Promise<undefined> {
        const stringList = await getURL()
            .then(url => fetch(url))                    // fetch data
            .then(response => response.text())          // process data
            .then(raw_data => raw_data.split('\n'))     // split into rows
            .catch(err => {
                alert("ERROR: Unable to fetch data!\nUsing sample data instead.");
                return [...SAMPLE_DATA];
            });
    
        stringList.shift();  // remove header
        stringList.pop();  // remove undefined row
    
        this.rawModuleList = stringList.map(stringToModule);
        this.suModuleList = this.rawModuleList.map(moduleToSu);
    }

    public getRawList(): Module[] {
        return [...this.rawModuleList];
    }

    public getSuList(): Module[] {
        return [...this.suModuleList];
    }
}

export default ModuleData;
