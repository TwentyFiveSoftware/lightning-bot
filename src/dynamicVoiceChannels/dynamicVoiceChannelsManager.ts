import type { Client, Message } from 'discord.js';
import pg from 'pg';
import config from '../config';
import { SQL_CREATE_TABLE_DVC, SQL_CREATE_TABLE_JTC } from './databaseQueries';
import onChannelDelete from './onChannelDelete';
import onVoiceStateUpdate from './onVoiceStateUpdate';
import cmdCreateChannel from './cmdCreateChannel';

const register = async (client: Client): Promise<void> => {
    const database = new pg.Client({
        connectionString: process.env['DATABASE_URL'],
        ssl: { rejectUnauthorized: false },
    });

    await database.connect();

    await database.query(SQL_CREATE_TABLE_JTC);
    await database.query(SQL_CREATE_TABLE_DVC);

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
    });
};

export default register;
