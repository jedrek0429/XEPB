import { readFileSync } from 'fs';

export default class DotEnv {
	constructor(path: string = '.env') {
		for (const line of readFileSync(path, 'utf8').split('\n')) {
			if (line.startsWith('#'))
				continue;

			const [key, value] = line.split('=');
			process.env[key] = value;
		}
	}
}
