import { ChatInputApplicationCommandData } from 'discord.js';
import BaseI18nCommandData from '~/interfaces/BaseI18nCommandData';

export type I18nCommandData = ChatInputApplicationCommandData &
  BaseI18nCommandData;
