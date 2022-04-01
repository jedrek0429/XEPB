import Client from '@classes/Client';

export interface EventRun {
  // eslint-disable-next-line no-unused-vars
  (client: Client, ...args: any[]): any;
}

// eslint-disable-next-line no-shadow
export interface Event {
  disabled?: boolean;
  once?: boolean;
  run: EventRun;
}
