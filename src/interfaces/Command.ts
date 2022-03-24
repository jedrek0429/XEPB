import { CommandInteraction, ApplicationCommandData } from "discord.js";


export interface CommandRun {
    (interaction: CommandInteraction): any;
}

export interface Command {
    disabled?: boolean;
    data: ApplicationCommandData;
    run: CommandRun;
}