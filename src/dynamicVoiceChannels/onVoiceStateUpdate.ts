import type { Client, VoiceState } from 'discord.js';
import type { Database } from 'better-sqlite3';
import config from '../config';

const handle = async (
    _client: Client,
    database: Database,
    _oldState: VoiceState,
    newState: VoiceState,
): Promise<void> => {
    const joinedChannel = newState.channel;
    if (!joinedChannel) return;

    const row = database
        .prepare('SELECT * FROM joinToCreateChannels WHERE guildId = ? AND channelId = ?')
        .get(joinedChannel.guild.id, joinedChannel.id);

    if (!row) return;

    const createdChannel = await joinedChannel.guild.channels.create(config.joinToCreate.tempChannelName, {
        type: 'voice',
        parent: joinedChannel.parent ?? undefined,
    });

    await newState.member?.voice.setChannel(createdChannel);
};

const registerEvent = (client: Client, database: Database): void => {
    client.on('voiceStateUpdate', (...args) => handle(client, database, ...args));
};

export default { registerEvent };
