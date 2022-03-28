import Client from "~/classes/Client";
import glob from "glob";
import { Event } from "~/interfaces/Event";
import { basename } from "path";
import { Constants } from "discord.js";
const { Events } = Constants;

export default async (client: Client) => {
    const events: string[] = [...glob.sync(`${__dirname}/../events/*.{js, ts}`)];
        for (const eventFile of events) {
            const event: Event = await import(eventFile);
            const eventName = basename(eventFile).replace(/.[^/.]+$/, '');
            if (event.disabled) continue;
            if (!Object.keys(Events).includes(eventName) && !Object.values(Events).includes(eventName)) {
                console.warn(`"${eventName}" is not a correct event name, ignoring...`); 
                continue;
            }
            if (event.once) client.once(eventName, event.run.bind(null, client));
            else client.on(eventName, event.run.bind(null, client));
        }
}