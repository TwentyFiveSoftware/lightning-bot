import type { Channel, Client, VoiceChannel } from 'discord.js';
import type { Database } from 'better-sqlite3';

const handle = async (database: Database, channel: Channel): Promise<void> => {
    if (channel.type !== 'voice') return;

    const voiceChannel = channel as VoiceChannel;

    const row = database
        .prepare('SELECT * FROM joinToCreateChannels WHERE guildId = ? AND channelId = ?')
        .get(voiceChannel.guild.id, voiceChannel.id);

    if (!row) return;

    database
        .prepare('DELETE FROM joinToCreateChannels WHERE guildId = ? AND channelId = ?')
        .run(voiceChannel.guild.id, voiceChannel.id);
};

const registerEvent = (client: Client, database: Database): void => {
    client.on('channelDelete', (...args) => handle(database, ...args));
};

export default { registerEvent };
