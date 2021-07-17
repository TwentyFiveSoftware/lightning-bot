import type { Message } from 'discord.js';
import config from '../config';
import { database } from '../database';
import { SQL_INSERT_JTC } from './databaseQueries';

const registerCommand = async (message: Message, args: string[]): Promise<void> => {
    const channel = await message.guild?.channels.create(config.joinToCreate.defaultChannelName, { type: 'voice' });
    if (!channel) return;

    const tempRoomName = args.length === 0 ? config.joinToCreate.tempChannelName : args.join(' ');

    await database.query(SQL_INSERT_JTC, [channel.guild.id, channel.id, tempRoomName]);
};

export default { registerCommand };
