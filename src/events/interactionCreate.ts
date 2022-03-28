import { EventRun } from "~/interfaces/Event";
import Client from "~/classes/Client";
import { CommandInteraction } from "discord.js";
import { Command } from "~/interfaces/Command";

export const run: EventRun = async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.isCommand) return;

    const command: Command | undefined = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.run(interaction);
    } catch (error) {
        console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}