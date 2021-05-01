import type { Client, Channel, VoiceChannel } from 'discord.js';
import type { Database } from 'better-sqlite3';
import config from '../config';

const handle = (_client: Client, database: Database, channel: Channel): void => {
    if (channel.type !== 'voice') return;

    const voiceChannel = channel as VoiceChannel;
    if (voiceChannel.name !== config.joinToCreate.joinToCreateChannelName) return;

    console.log(voiceChannel.id);

    database.prepare('INSERT INTO joinToCreateChannels VALUES (?, ?)').run(voiceChannel.guild.id, voiceChannel.id);
};

const registerEvent = (client: Client, database: Database): void => {
    client.on('channelCreate', (...args) => handle(client, database, ...args));
};

export default { registerEvent };
