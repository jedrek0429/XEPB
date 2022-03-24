import { EventRun } from "../interfaces/Event";
import Client from "../classes/Client";

export const run: EventRun = async (client: Client) => {
    console.log("Ready!");
};