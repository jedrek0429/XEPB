import { CommandRun } from '~/interfaces/Command';
import { ApplicationCommandType, CommandInteraction } from 'discord.js';
import Embed from '~/classes/Embed';
import Client from '~/classes/Client';
import { I18nCommandData } from '~/utils/types';

export const data: I18nCommandData = {
	name: 'ping',
	type: ApplicationCommandType.ChatInput,
} as I18nCommandData;
export const run: CommandRun = (interaction: CommandInteraction) => {
	const client: Client = interaction.client as Client;
	interaction.reply({
		embeds: [
			new Embed(client, interaction.locale).setDescription(
				client.i18n.t('commands.ping.texts.pong', { lng: interaction.locale }),
			),
		],
	});
};
