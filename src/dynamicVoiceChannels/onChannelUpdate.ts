import type { Client, Channel, VoiceChannel } from 'discord.js';
import type { Database } from 'better-sqlite3';
import config from '../config';

const handle = (_client: Client, database: Database, _oldChannel: Channel, newChannel: Channel): void => {
    if (newChannel.type !== 'voice') return;

    const voiceChannel = newChannel as VoiceChannel;

    const wasJoinToCreateChannel = database
        .prepare('SELECT * FROM joinToCreateChannels WHERE guildId = ? AND channelId = ?')
        .get(voiceChannel.guild.id, voiceChannel.id);

    if (wasJoinToCreateChannel) {
        database
            .prepare('DELETE FROM joinToCreateChannels WHERE guildId = ? AND channelId = ?')
            .run(voiceChannel.guild.id, voiceChannel.id);

        return;
    }

    if (voiceChannel.name !== config.joinToCreate.joinToCreateChannelName) return;

    database.prepare('INSERT INTO joinToCreateChannels VALUES (?, ?)').run(voiceChannel.guild.id, voiceChannel.id);
};

const registerEvent = (client: Client, database: Database): void => {
    client.on('channelUpdate', (...args) => handle(client, database, ...args));
};

export default { registerEvent };
