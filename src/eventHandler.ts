import type { IEvent } from './types/Event';
import type { Client } from 'discord.js';
import ready from './events/ready';

const events: IEvent[] = [ready];

const registerEvents = (client: Client): void => {
    for (const event of events) {
        client.on(event.name, (...args: unknown[]) => event.execute(client, ...args));
    }
};

export { registerEvents };
