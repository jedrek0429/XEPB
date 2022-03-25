import { CommandRun } from "../interfaces/Command";
import { CommandInteraction } from "discord.js";
import Client from "../classes/Client";

export const disabled: boolean = false;
export const run: CommandRun = async (interaction: CommandInteraction) => {
    const client: Client = interaction.client as Client;
}; 