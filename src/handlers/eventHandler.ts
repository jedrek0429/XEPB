import Client from '~/classes/Client';
import glob from 'glob';
// eslint-disable-next-line no-shadow
import { Event } from '~/interfaces/Event';
import { basename } from 'path';
import { ClientEvents, Events } from 'discord.js';

export default async (client: Client) => {
	const events: string[] = [...glob.sync(`${__dirname}/../events/*.{js, ts}`)];
	for (const eventFile of events) {
		const event: Event = await import(eventFile);
		if (event.disabled) continue;
		const eventName: keyof ClientEvents = basename(eventFile).replace(/.[^/.]+$/, '') as keyof ClientEvents;
		if (!Object.values(Events).includes(eventName)) {
			console.warn(`"${eventName}" is not a correct event name, ignoring...`);
			continue;
		}
		if (event.once) client.once(eventName, event.run.bind(null, client));
		else client.on(eventName, event.run.bind(null, client));
	}
};
