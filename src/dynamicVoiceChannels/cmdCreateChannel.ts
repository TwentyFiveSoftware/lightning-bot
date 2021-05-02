import type { Message } from 'discord.js';
import pg from 'pg';
import config from '../config';
import { SQL_INSERT_JTC } from './databaseQueries';

const registerCommand = async (message: Message, database: pg.Client): Promise<void> => {
    const channel = await message.guild?.channels.create(config.joinToCreate.defaultChannelName, { type: 'voice' });
    if (!channel) return;

    await database.query(SQL_INSERT_JTC, [channel.guild.id, channel.id]);
};

export default { registerCommand };
