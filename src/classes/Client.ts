import { Client, ClientOptions, Intents } from "discord.js";
import { Event } from "../interfaces/Event";
import glob from "glob";
import { basename } from "path";

const defaultClientOptions: ClientOptions = { intents: [Intents.FLAGS.GUILDS]};

export default class XEPBClient extends Client {
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
        this.login(token);
        this.handleEvents();
    }

    async handleEvents() {
        const events: string[] = [...glob.sync(`${__dirname}/../events/*.{js, ts}`)];
            for (const eventFile of events) {
                const event: Event = await import(eventFile);
                const eventName = basename(eventFile).replace(/.[^/.]+$/, '');
                if (event.disabled) continue;
                if (event.once) {
                    this.once(eventName, event.run.bind(null, this))
                } else {
                    this.on(eventName, event.run.bind(null, this))
                }
            }
    }
}