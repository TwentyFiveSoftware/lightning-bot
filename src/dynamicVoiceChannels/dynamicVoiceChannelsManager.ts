import type { Client, Message } from 'discord.js';
import sqlite from 'better-sqlite3';
import config from '../config';
import onChannelDelete from './onChannelDelete';
import onVoiceStateUpdate from './onVoiceStateUpdate';
import cmdCreateChannel from './cmdCreateChannel';

const register = (client: Client): void => {
    const database = sqlite('./db/dynamicVoiceChannels.db');

    database
        .prepare(
            `
                CREATE TABLE IF NOT EXISTS joinToCreateChannels(
                    guildId VARCHAR,
                    channelId VARCHAR 
                );
            `,
        )
        .run();

    database
        .prepare(
            `
                CREATE TABLE IF NOT EXISTS dynamicVoiceChannels(
                    guildId VARCHAR,
                    channelId VARCHAR 
                );
            `,
        )
        .run();

    onChannelDelete.registerEvent(client, database);
    onVoiceStateUpdate.registerEvent(client, database);

    client.on('message', async (message: Message) => {
        if (!message.content.toLowerCase().startsWith(config.commandPrefix) || message.author.bot) return;

        const args = message.content.trim().split(/ +/).slice(1);
        if (args.length === 0) return;

        const command = (args.shift() ?? '').toLowerCase();

        if (command === config.joinToCreate.command.toLowerCase()) {
            await cmdCreateChannel.registerCommand(message, database);
        }

        await message.delete();
    });
};

export default register;
