import { CommandRun } from "../interfaces/Command";
import { ApplicationCommandData, CommandInteraction } from "discord.js";
import Client from "../classes/Client";

export const disabled: boolean = false;
export const data: ApplicationCommandData = {
    name: "ping",
    description: "pongs..."
}
export const run: CommandRun = async (interaction: CommandInteraction) => {
    const client: Client = interaction.client as Client;
    interaction.reply("pong...")
}; 