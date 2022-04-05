import { TextChannel } from 'discord.js';
import Client from '@classes/Client';
import Embed from '@classes/Embed';
import { errorsChannel } from '@config.json';

export default class ErrorHandler {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
		for (const err of [
			'unhandledRejection',
			'uncaughtExceptionMonitor',
			'uncaughtException',
		])
			process.on(err, (error) => this.handle(error));
	}

	public handle(
		error: Error,
		channel: TextChannel = this.client.channels.resolve(
			errorsChannel,
		) as TextChannel,
	): void {
		if (process.env.NODE_ENV === 'development') console.error(error);
		const embed = new Embed(this.client);
		embed.addFields({
			name: 'Error:',
			value: `\`\`\`${error.stack?.slice(0, 1000)}\`\`\``,
		});
		channel?.send({ embeds: [embed] });
	}
}
