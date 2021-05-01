import type { Message } from 'discord.js';
import type { Database } from 'better-sqlite3';
import config from '../config';

const registerCommand = async (message: Message, database: Database): Promise<void> => {
    const channel = await message.guild?.channels.create(config.joinToCreate.defaultChannelName, { type: 'voice' });
    if (!channel) return;

    database.prepare('INSERT INTO joinToCreateChannels VALUES (?, ?)').run(channel.guild.id, channel.id);
};

export default { registerCommand };
