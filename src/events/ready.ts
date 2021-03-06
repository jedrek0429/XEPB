import { EventRun } from '@interfaces/Event';
import Client from '@classes/Client';
import { Routes } from 'discord-api-types/v10';

export const run: EventRun = (client: Client) => {
	client.restAPI
		.put(Routes.applicationCommands(client.user!.id), {
			body: [...client.commands.map((v) => v.data)],
		})
		.then(() => console.log('Registered commands.'))
		.catch(console.error);
	console.log('Ready!');
};
