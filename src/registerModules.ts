import type { Client } from 'discord.js';
import * as dynamicVoiceChannelsManager from './dynamicVoiceChannels/dynamicVoiceChannelsManager';
import { Message } from 'discord.js';
import config from './config';

const registerModules = async (client: Client): Promise<void> => {
    await dynamicVoiceChannelsManager.register(client);

    await registerCommands(client);
};

const registerCommands = async (client: Client) => {
    client.on('message', async (message: Message) => {
        if (!message.content.toLowerCase().startsWith(config.commandPrefix) || message.author.bot) return;

        const args = message.content.trim().split(/ +/).slice(1);
        if (args.length === 0) return;

        const command = (args.shift() ?? '').toLowerCase();

        await dynamicVoiceChannelsManager.registerCommands(command, args, message);
    });
};

export { registerModules };
