import type { Client } from 'discord.js';

export interface IEvent {
    name: string;
    execute: (client: Client, ...args: unknown[]) => void;
}
