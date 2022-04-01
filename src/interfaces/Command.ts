import { CommandInteraction } from 'discord.js';
import { APIApplicationCommand } from 'discord-api-types/v10';

export interface CommandRun {
  // eslint-disable-next-line no-unused-vars
  (interaction: CommandInteraction): any;
}

export interface Command {
  disabled?: boolean;
  data?: APIApplicationCommand;
  run: CommandRun;
}
