/* eslint-disable linebreak-style */
import Client from '~/classes/Client';
import { Command } from '~/interfaces/Command';

const handleOptions = (x: any, lang: string, client: Client, command: Command): void => {
	if (x.options.length) {
		for (const option of x.options) {
			option.name_localizations[lang] = client.i18n.t(`commands.${command.data.name}.options.${option.name}.name`, { lng: lang });
			option.description_localizations[lang] = client.i18n.t(`commands.${command.data.name}.options.${option.name}.description`, { lng: lang });

			handleOptions(option, lang, client, command);
		}
	}
};

export default handleOptions;
