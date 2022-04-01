/* eslint-disable camelcase */
import Client from '@classes/Client';
import { APIApplicationCommand, LocaleString } from 'discord-api-types/v10';
import { Command } from '@interfaces/Command';
import handleOptions from '@handlers/optionsI18nHandler';

export default (client: Client, command: Command): APIApplicationCommand => {
	const data: APIApplicationCommand = {
		name: command.data.name,
		type: command.data.type,
		application_id: client.user!.id,
		id: command.data.id,
		version: 'v10',
		description: client.i18n.t(`commands.${command.data.name}.description`),
	};
	for (const lang of ['en-US', 'pl'] as LocaleString[]) {
		data.name_localizations[lang] = client.i18n.t(`commands.${command.data.name}.name`, { lng: lang }) || data.name;
		// FIXME - the code stops here
		data.description_localizations[lang] = client.i18n.t(`commands.${command.data.name}.description`, { lng: lang }) || data.description;
		handleOptions(data, lang, client, command);
	}
	return data;
};
