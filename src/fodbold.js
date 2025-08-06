import { readFile, writeFile, appendFile} from 'node:fs/promises';
import { resolve } from 'node:path';
import { input, select, confirm, Separator } from '@inquirer/prompts';
import { parse } from 'csv-parse';
import { init } from '../cli.js';

const ScriptAction = Object.freeze({
    DISPLAY: 1,
    TOPSCORER: 2,
    ADD: 3,
    DELETE: 4,
    EXIT: 5
});

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

    async reload() {
        let fileData = await this.readFile(this.getFilePath);
        await this.transformFileData(fileData);
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
        
        for (let prop in fileData.at(-1)) {
            if (fileData.at(-1).hasOwnProperty(prop) && (fileData.at(-1)[prop] === null || fileData.at(-1)[prop] === undefined)) {
                fileData.pop();
                break;
            }
        }

        this.setFileData = fileData;
        this.setColumns = Object.values(fileData.shift());
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
    
    showTopScorer() {
        let topScorer = this.data.reduce((maxObj, currentObj) => {
            return currentObj > maxObj.gls ? currentObj : maxObj;
        });

        console.log(topScorer);
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
            message: "birth year: ",
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
            await appendFile(this.getFilePath, content, { encoding: "utf8" });

            await this.reload();
        } catch (e) {
            console.error(e.message);
        }
    }

    async deleteFromFile() {
        let answer;
        let selectable = [];

        for (const [key, value] of this.getData.entries()) {
            let addToSelectable = { name: Object.values(value).join(";"), value: key };
            selectable.push(addToSelectable);
        }

        answer = await select({
            message: "select player to delete",
            choices: [
                new Separator("sep"),
                ...selectable
            ],
        });

        let confirmDelete = await confirm({
            message: `are you sure you want to delete item ${answer}?`
        });

        if (!confirmDelete) {
            return;
        }

        this.getData.splice(answer, 1);

        let columns = this.getColumns.join(';');
        let rows = this.getData.map(obj => {
            return Object.values(obj).map(value => {
                return value;
            }).join(';');
        });
        
        let csv = `${columns}\n${rows.join('\n')}`;
        
        try {
            await writeFile(this.getFilePath, csv, { encoding: "utf8" });

            await this.reload();
        } catch (e) {
            console.error(e.message);
        }
    }
}

const initScript = async () => {
    const filePath = resolve('./data/players_data-2024_2025.csv');

    let df = new DataFrame(filePath);    
    let data = await df.readFile(filePath);

    await df.transformFileData(data);
    
    let choice;
    
    do {
        choice = await select({
            message: "select action",
            choices: [
                { name: "Display players", value: ScriptAction.DISPLAY },
                { name: "Show top scorer", value: ScriptAction.TOPSCORER },
                { name: "Add new player", value: ScriptAction.ADD },
                { name: "Remove a player", value: ScriptAction.DELETE },
                { name: "Exit", value: ScriptAction.EXIT }
            ],
        });

        switch (choice) {
            case ScriptAction.DISPLAY: {
                df.showFileContentAsTable();
                break;
            }
            case ScriptAction.TOPSCORER: {
                df.showTopScorer();
                break;
            }
            case ScriptAction.ADD: {
                await df.appendToFile();
                console.clear();
                df.showFileContentAsTable();
                break;
            }
            case ScriptAction.DELETE: {
                await df.deleteFromFile();
                console.clear();
                df.showFileContentAsTable();
                break;
            }
            case ScriptAction.EXIT: {
                console.clear();
                await init();
            }
            default: {
                console.log(`${choice} is not valid`);
            }
        }
    } while (choice !== ScriptAction.EXIT)
}

const fodbold = { initScript };

export default fodbold;
