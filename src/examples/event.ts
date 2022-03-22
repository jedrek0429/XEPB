import { ClientEvents, EventRun, Client } from "../imports/event";

export const name: keyof ClientEvents = "ready";
export const run: EventRun = async (client: Client, args: any) => {}; 
export const once: boolean = true; 
export const disabled: boolean = false;