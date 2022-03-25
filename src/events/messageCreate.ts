import { EventRun } from "../interfaces/Event";
import Client from "../classes/Client";
import { Message } from "discord.js";

export const run: EventRun = async (client: Client, message: Message) => {
    if (!message.author.bot && message.content.toLowerCase().includes("dżejuś")) return message.reply("dżejuś");
}; 
