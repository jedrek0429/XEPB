import { Client, ClientOptions, Intents, Constants, MessageEmbed, Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Event } from "../interfaces/Event";
import { Command } from "../interfaces/Command";
import glob from "glob";
import { basename } from "path";
import * as config from "../config.json";

const { Events } = Constants;
const defaultClientOptions: ClientOptions = { intents: [Intents.FLAGS.GUILDS]};
let rest: REST;

export default class XEPBClient extends Client {
    public commands: Collection<string, Command> = new Collection();
    constructor(clientOptions?: ClientOptions) {
        super(clientOptions || defaultClientOptions);
        super.token = process.env.TOKEN!;
    }
    /**
     * Logs in, loads handlers and starts the client
     * 
     * @param {string} [token] - Token for client login, if empty envoirmental variable `TOKEN` is used instead.
     */
    start(token?: string) {
        console.log('Starting...');
        if (token) this.token = token;
        this.login();
        rest = new REST({ version: '9' }).setToken(this.token!);
        this.handleEvents();
    }

    async handleEvents() {
        const events: string[] = [...glob.sync(`${__dirname}/../events/*.{js, ts}`)];
        for (const eventFile of events) {
            const event: Event = await import(eventFile);
            const eventName = basename(eventFile).replace(/.[^/.]+$/, '');
            if (event.disabled) continue;
            if (!Object.keys(Events).includes(eventName) || !Object.values(Events).includes(eventName)) console.warn(`"${eventName}" is not a correct event name, ignoring...`);
            if (event.once) this.once(eventName, event.run.bind(null, this));
            else this.on(eventName, event.run.bind(null, this));
        }
    }

    async handleCommands() {
        const commands: string[] = [...glob.sync(`${__dirname}/../commands/*.{js, ts}`)];
        for (const commandFile of commands) {
            const command: Command = await import(commandFile);
            if (command.disabled) continue;
            this.commands.set(command.data.name, command);
        }

        rest.put(Routes.applicationCommands(config.client.id), { body: [...this.commands.values()] })
            .then(() => console.log('Registered commands.'))
            .catch(console.error);
    }

    Embed = class Embed extends MessageEmbed {
        constructor() {
            super();
            this.setColor("#2f3136");
        }
    }
}