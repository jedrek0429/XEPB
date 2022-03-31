import { CommandInteraction } from 'discord.js';
import { I18nCommandData } from '~/utils/types';

export interface CommandRun {
  // eslint-disable-next-line no-unused-vars
  (interaction: CommandInteraction): any;
}

export interface Command {
  disabled?: boolean;
  data?: I18nCommandData;
  run: CommandRun;
}
