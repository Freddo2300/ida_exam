import * as http from 'node:http';
import { readFile } from 'node:fs/promises';

import util from '../utilities.js';

const initServer = async () => {
    let indexFile;

    const listener = function (req, res) {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(indexFile);
    }

    const server = http.createServer(listener);

    const port = 8080;
    const host = 'localhost';

    await readFile('./src/site.html')
        .then(contents => {
            indexFile = contents;
            server.listen(port, host, () => {
                console.log(`Server is running on http://${host}:${port}`);
            });
        })
        .catch(e => {
            console.error(e.message);
            server.close(function () { console.log("Server closed"); });
        });
}

const executeScript = async () => { await initServer(); }

export function onButtonClickEvent() { let r = util.generateRandomRgbValue(); let g = util.generateRandomRgbValue(); let b = util.generateRgbValue();

    document.getElementByTagName("html").style.backgroundColor = rgb(r, g, b);
}

const site = { executeScript };

export default site;
