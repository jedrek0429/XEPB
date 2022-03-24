import { CommandRun } from "../interfaces/Command";
import { CommandInteraction, Client } from "discord.js";
import XEPBClient from "../classes/Client";

export const disabled: boolean = false;
export const run: CommandRun = async (interaction: CommandInteraction) => {
    const client: Client = interaction.client;  // have to fix
}; 