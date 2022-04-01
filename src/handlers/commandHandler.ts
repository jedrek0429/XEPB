import Client from '@classes/Client';
import glob from 'glob';
import { Command } from '@interfaces/Command';
import handleCommandsI18n from './commandI18nHandler';

export default async (client: Client) => {
	const commands: string[] = [
		...glob.sync(`${__dirname}/../commands/*.{js, ts}`),
	];
	for (const commandFile of commands) {
		const command: Command = await import(commandFile);
		if (command.disabled) continue;
		const data = await handleCommandsI18n(client, command);
		command.data = data;
		client.commands.set(data.name, command);
	}
};
