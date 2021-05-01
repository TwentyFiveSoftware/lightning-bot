import type { Channel, Client, VoiceChannel } from 'discord.js';
import pg from 'pg';

const handle = async (database: pg.Client, channel: Channel): Promise<void> => {
    if (channel.type !== 'voice') return;

    const voiceChannel = channel as VoiceChannel;

    await database.query('DELETE FROM join_to_create_channels WHERE guild_id = $1 AND channel_id = $2', [
        voiceChannel.guild.id,
        voiceChannel.id,
    ]);
};

const registerEvent = (client: Client, database: pg.Client): void => {
    client.on('channelDelete', (...args) => handle(database, ...args));
};

export default { registerEvent };
