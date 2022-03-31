import { CommandRun } from '~/interfaces/Command';
import { CommandInteraction } from 'discord.js';
import { I18nCommandData } from '~/utils/types';

export const disabled: boolean = false;
export const data: I18nCommandData = {
	name: 'permissions',
	options: [
		{
			name: 'subcommandGroup1',
			type: 2,
			options: [
				{
					name: 'subcommand1',
					type: 1,
				},
				{
					name: 'subcommand2',
					type: 1,
				},
			],
		},
		{
			name: 'subcommandGroup2',
			type: 2,
			options: [
				{
					name: 'subcommand3',
					type: 1,
				},
				{
					name: 'subcommand4',
					type: 1,
				},
			],
		},
	],
} as I18nCommandData;
export const run: CommandRun = (interaction: CommandInteraction) => {
	interaction.reply('working?');
};
