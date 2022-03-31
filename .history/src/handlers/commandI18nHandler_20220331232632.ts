import Client from '~/classes/Client';
import { I18nCommandData } from '~/utils/types';
import { Command } from '~/interfaces/Command';
import handleOptions from '~/handlers/optionsI18nHandler';

export default (client: Client, command: Command): I18nCommandData => {
	const data: I18nCommandData = {
		name: command.data.name,
		description: client.i18n.t(`commands.${command.data.name}.description`),
	};
	for (const lang of ['en-US', 'pl']) {
		data.name_localizations[lang] = client.i18n.t(`commands.${command.data.name}.name`, { lng: lang }) || data.name;
		// FIXME - the code stops heree
		data.description_localizations[lang] = client.i18n.t(`commands.${command.data.name}.description`, { lng: lang }) || data.description;
		handleOptions(data, lang, client, command);
	}

	return data;
};
