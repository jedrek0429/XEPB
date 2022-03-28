import { MessageEmbed } from "discord.js";

export default class Embed extends MessageEmbed {
    constructor() {
        super();
        this.setColor("#2f3136");
    }
}