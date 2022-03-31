import { ApplicationCommandOptionData } from 'discord.js';

interface BaseI18nCommandOptionData {
  key: string;
  name_localizations?: { [key: string]: string };
  description_localizations?: { [key: string]: string };
  // eslint-disable-next-line no-use-before-define
  options?: I18nCommandOptionData[];
}

type I18nCommandOptionData = ApplicationCommandOptionData &
  BaseI18nCommandOptionData

export default interface BaseI18nCommandData {
  name_localizations?: { [key: string]: string };
  description_localizations?: { [key: string]: string };
  options?: I18nCommandOptionData[];
  // eslint-disable-next-line semi
}
