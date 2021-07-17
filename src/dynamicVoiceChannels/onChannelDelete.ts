import type { Channel, Client, VoiceChannel } from 'discord.js';
import { database } from '../database';
import { SQL_DELETE_JTC } from './databaseQueries';

const registerEvent = (client: Client): void => {
    client.on('channelDelete', async (channel: Channel) => {
        if (channel.type !== 'GUILD_VOICE') return;

        const voiceChannel = channel as VoiceChannel;
        await database.query(SQL_DELETE_JTC, [voiceChannel.guild.id, voiceChannel.id]);
    });
};

export default { registerEvent };
