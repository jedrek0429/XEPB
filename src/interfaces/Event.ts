import Client from '../utils/Client';
import { ClientEvents } from "discord.js";

export interface EventRun {
    (client: Client, ...args: any[]): any;
}

export interface Event {
    name: keyof ClientEvents;
    disabled?: boolean;
    once?: boolean;
    run: EventRun;
}
