import * as fs from 'fs';
import * as path from 'path';

import { readFile, writeFile } from 'fs/promises';

const pwd = process.cwd();

const outputFilePath = path.join(pwd, 'code.js');

const isFileBuilt: boolean = fs.existsSync(outputFilePath);

if (isFileBuilt) {
	readFile(outputFilePath).then(data => {
		const fileContents = data.toString();
		const pattern = /export {};\n$/gim;

		const fixedFileContents = fileContents.replace(pattern, '');

		writeFile(outputFilePath, fixedFileContents)
			.catch(reason => {
				console.error(`Error occurred while file saving (${reason}).`);
			})
			.then(() => {
				console.log('Successfully fixed output file.');
			});
	});
}
