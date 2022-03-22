import Client from '../classes/Client';

export interface EventRun {
    (client: Client, ...args: any[]): any;
}

export interface Event {
    disabled?: boolean;
    once?: boolean;
    run: EventRun;
}
