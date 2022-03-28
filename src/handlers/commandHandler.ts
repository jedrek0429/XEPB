import Client from "~/classes/Client";
import glob from "glob";
import { Command } from "~/interfaces/Command";

export default async (client: Client) => {
    const commands: string[] = [...glob.sync(`${__dirname}/../commands/*.{js, ts}`)];
    for (const commandFile of commands) {
        const command: Command = await import(commandFile);
        if (command.disabled) continue;
        client.commands.set(command.data.name, command);
    }
}