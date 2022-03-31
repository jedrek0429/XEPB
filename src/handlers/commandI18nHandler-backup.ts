import Client from '~/classes/Client';
import { I18nCommandData } from '~/utils/types';
import { Command } from '~/interfaces/Command';
import handleOptions from './optionsI18nHandler';

export default (client: Client, command: Command): I18nCommandData => {
	const data: I18nCommandData = {
		name: command.data.name,
		description: client.i18n.t(`commands.${command.data.name}.description`),
	};
	for (const lang of ['en', 'pl']) {
		data.name_localizations[lang] = client.i18n.t(`commands.${command.data.name}.name`, { lng: lang });
		// The code stops here
		data.description_localizations[lang] = client.i18n.t(`commands.${command.data.name}.description`, { lng: lang });
		handleOptions(data, lang, client, command);
	}

	return data;
};
