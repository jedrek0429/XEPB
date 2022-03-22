import { Client, ClientOptions, Intents } from "discord.js";
import { Event } from "../interfaces/Event";
import glob from "glob";

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
        handleEvents(this);
    }
}

const handleEvents = async (client: XEPBClient) => {
    const events: string[] = [...glob.sync(`${__dirname}/../events/*.{js, ts}`)];
        for (const eventFile of events) {
            const event: Event = await import(eventFile);
            if (event.disabled) continue;
            if (event.once) {
                client.once(event.name, event.run.bind(null, client))
            } else {
                client.on(event.name, event.run.bind(null, client))
            }
        }
}