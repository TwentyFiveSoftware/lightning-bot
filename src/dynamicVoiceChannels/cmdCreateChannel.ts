import type { Message } from 'discord.js';
import pg from 'pg';
import config from '../config';

const registerCommand = async (message: Message, database: pg.Client): Promise<void> => {
    const channel = await message.guild?.channels.create(config.joinToCreate.defaultChannelName, { type: 'voice' });
    if (!channel) return;

    await database.query('INSERT INTO join_to_create_channels VALUES ($1, $2)', [channel.guild.id, channel.id]);
};

export default { registerCommand };
