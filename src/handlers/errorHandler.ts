import { MessageEmbed, TextChannel } from "discord.js";
import Client from "~/classes/Client";
import Embed from "~/utils/Embed";
import { errorsChannel } from "~/config.json";

export default class ErrorHandler {
    private client: Client;
    constructor(client: Client) {
        this.client = client;
        for (const err of ['uncaughtException', 'uncaughtRejectionMonitor']) {
            process.on(err, (error) => this.handle(error));
        }
    }

    public handle(error: Error, channel: TextChannel = this.client.channels.resolve(errorsChannel) as TextChannel) : void {
        if (process.env?.NODE_ENV === 'development') console.log(error); 
        const embed: MessageEmbed = new Embed() as MessageEmbed;
        embed.addFields({ name: 'Error:', value: `\`\`\`${error.stack?.slice(0, 1000)}\`\`\`` })
        channel.send({ embeds: [embed] });
    }
}