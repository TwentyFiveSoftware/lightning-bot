import type { Client } from 'discord.js';

const registerEvent = (client: Client): void => {
    client.on('ready', (): void => {
        console.log(`Ready! Logged in as ${client.user?.tag}`);
    });
};

export default { registerEvent };
