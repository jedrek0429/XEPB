import { CommandRun } from "../interfaces/Command";
import { CommandInteraction } from "discord.js";

export const disabled: boolean = false;
export const run: CommandRun = async (interaction: CommandInteraction) => {
    interaction.reply("pong...")
}; 