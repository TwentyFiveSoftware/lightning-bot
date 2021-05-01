import type { Client, GuildMember, VoiceChannel, VoiceState } from 'discord.js';
import type { Database } from 'better-sqlite3';
import config from '../config';

const handle = async (database: Database, oldState: VoiceState, newState: VoiceState): Promise<void> => {
    if (oldState.channel) await deleteChannel(oldState.channel, database);
    if (newState.channel) await createChannel(newState.channel, newState.member, database);
};

const deleteChannel = async (leftChannel: VoiceChannel, database: Database) => {
    if (leftChannel.members.size > 0) return;

    const row = database
        .prepare('SELECT * FROM dynamicVoiceChannels WHERE guildId = ? AND channelId = ?')
        .get(leftChannel.guild.id, leftChannel.id);

    if (!row) return;

    database
        .prepare('DELETE FROM dynamicVoiceChannels WHERE guildId = ? AND channelId = ?')
        .run(leftChannel.guild.id, leftChannel.id);

    await leftChannel.delete();
};

const createChannel = async (
    joinedChannel: VoiceChannel,
    member: GuildMember | null,
    database: Database,
): Promise<void> => {
    const row = database
        .prepare('SELECT * FROM joinToCreateChannels WHERE guildId = ? AND channelId = ?')
        .get(joinedChannel.guild.id, joinedChannel.id);

    if (!row) return;

    const createdChannel = await joinedChannel.guild.channels.create(config.joinToCreate.tempChannelName, {
        type: 'voice',
        parent: joinedChannel.parent ?? undefined,
    });

    await member?.voice.setChannel(createdChannel);

    database.prepare('INSERT INTO dynamicVoiceChannels VALUES (?, ?)').run(createdChannel.guild.id, createdChannel.id);
};

const registerEvent = (client: Client, database: Database): void => {
    client.on('voiceStateUpdate', (...args) => handle(database, ...args));
};

export default { registerEvent };
