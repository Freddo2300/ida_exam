import { readFile, writeFile, appendFile} from 'node:fs/promises';
import { resolve } from 'node:path';
import { input, select } from '@inquirer/prompts';
import { parse } from 'csv-parse';

const readCsvFile = async (path) => {
    const promise = await readFile(path, { encoding: 'utf8' });
    
    return Promise.resolve(promise);
}

const transformData = async (csvData) => {  
    let data = csvData
        .toString()
        .split('\n')
        .map(e => e.trim())
        .map(e => e.split(';').map(e => e.trim()));
    
    let columns = data.shift();

    data = data.map(function(row) {
        return columns.reduce(function(obj, key, i) {
            obj[key.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').toLowerCase()] = row[i];

            return obj;
        }, {});
    });

    return { columns, data }
}

const displayData = async (data) => {
    console.table(data.data, data.column);
}

const addData = async (file) => {
    }

const deleteData = async (file) => {

}

class Player {
    player;
    nation;
    pos;
    squad;
    comp;
    born;
    gls;
    ast;
    ga;

    constructor(player, nation, pos, squad, comp, born, gls, ast, ga) {
        this.player = player;
        this.nation = nation;
        this.pos = pos;
        this.squad = squad;
        this.comp = comp;
        this.born = born;
        this.gls = gls;
        this.ast = ast;
        this.ga = ga;
    }
}

class DataFrame {
    filePath;
    fileData;
    columns;
    data;

    constructor(filePath, fileData=undefined, columns=undefined, data=undefined) {
        this.filePath = filePath;
        this.fileData = fileData;
        this.columns = columns;
        this.data = data;
    }

    get getFilePath() {
        return this.filePath;
    }

    set setFilePath(value) {
        this.filePath = value;
    }

    get getFileData() {
        return this.fileData;
    }

    set setFileData(value) {
        this.fileData = value;
    }

    get getColumns() {
        return this.columns;
    }

    set setColumns(value) {
        this.columns = value;
    }

    get getData() {
        return this.data;
    }

    set setData(value) {
        this.data = value;
    }

    async readFile(filePath) {
        this.setFilePath = filePath;
        
        let promise = await readFile(this.filePath, { encoding: "utf8" });
        let fileData = Promise.resolve(promise);

        this.setFileData = fileData;

        return fileData;
    }

    async transformFileData(data) {
        let fileData = data
            .toString()
            .split('\n')
            .map(e => e.trim())
            .map(e => e.split(';').map(e => e.trim()));
        
        let columns = fileData[0];

        fileData = fileData.map(function(row) {
            return columns.reduce(function(obj, key, i) {
                //key = key.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').toLowerCase()

                obj[key] = row[i];

                return obj;
            }, {});
        });
        
        this.setFileData = fileData;
        this.setColumns = columns;
        this.setData = fileData;
    }

    showFileContentAsTable() {
        try {
            if (typeof this.getColumns === 'undefined' || typeof this.getData === 'undefined') {
                throw new Error(`columns or data cannot be ${typeof undefined}`)
            }

            console.table(this.getData, this.getColumns);
        } catch (e) {
            console.error(e.message);
        }
    }

    async appendToFile() {
        let player = await input({
            message: "name: ",
            required: true,
        });

        let nation = await input({
            message: "nation: ",
            required: true,
        });

        let pos = await input({
            message: "position: ",
            required: true,
        });

        let squad = await input({
            message: "squad: ",
            required: true,
        });

        let comp = await input({
            message: "competition: ",
            required: true,
        });

        let born = await input({
            message: "DoB: ",
            required: true,
            validate: (val) => !isNaN(val) && !isNaN(parseInt(val)),
        });

        let gls = await input({
            message: "goals: ",
            required: true,
            validate: (val) => !isNaN(val) && !isNaN(parseInt(val)),
        });

        let ast = await input({
            message: "assists: ",
            required: true,
            validate: (val) => !isNaN(val) && !isNaN(parseInt(val)),
        });

        let ga = parseInt(gls) + parseInt(ast);

        let newPlayer = new Player(player, nation, pos, squad, comp, born, gls, ast, ga);

        try {
            const content = Object.values(newPlayer).join(";").concat("\n");
            await appendFile(file, content, { encoding: "utf8" });
        } catch (e) {
            console.error(e.message);
        }
    }

    async deleteFromTable() {
        let answer;

        answer = await select({
            message: 'select player to delete',
            choices: [
                ...this.data
            ],
        });

        console.log(answer);

        let confirmDelete = await confirm({
            message: `are you sure you want to delete item ${answer}?`
        });

        if (!confirmDate) {
            return;
        }

        let deleteItemIndex = this.data.indexOf(answer);
        this.data.splice(deleteItemIndex, 1);

        let csv = this.data.forEach((item) => {
            return Object.values(item).join(';').concat('\n');
        });
    }
}

const initScript = async () => {
    const filePath = resolve('./data/players_data-2024_2025.csv');

    let df = new DataFrame(filePath);    
    let data = await df.readFile(filePath);

    await df.transformFileData(data);
    
    let choice = await select({
        message: 'select '
    });
}

const fodbold = { initScript };

export default fodbold;
