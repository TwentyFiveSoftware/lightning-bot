import type { Channel, Client, VoiceChannel } from 'discord.js';
import pg from 'pg';
import { SQL_DELETE_JTC } from './databaseQueries';

const handle = async (database: pg.Client, channel: Channel): Promise<void> => {
    if (channel.type !== 'voice') return;

    const voiceChannel = channel as VoiceChannel;
    await database.query(SQL_DELETE_JTC, [voiceChannel.guild.id, voiceChannel.id]);
};

const registerEvent = (client: Client, database: pg.Client): void => {
    client.on('channelDelete', (...args) => handle(database, ...args));
};

export default { registerEvent };
