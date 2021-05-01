import type { Client, GuildMember, VoiceChannel, VoiceState } from 'discord.js';
import pg from 'pg';
import config from '../config';

const handle = async (database: pg.Client, oldState: VoiceState, newState: VoiceState): Promise<void> => {
    if (oldState.channel) await deleteChannel(oldState.channel, database);
    if (newState.channel) await createChannel(newState.channel, newState.member, database);
};

const deleteChannel = async (tempChannel: VoiceChannel, database: pg.Client) => {
    if (tempChannel.members.size > 0) return;

    const {
        rows,
    } = await database.query('SELECT * FROM dynamic_voice_channels WHERE guild_id = $1 AND channel_id = $2', [
        tempChannel.guild.id,
        tempChannel.id,
    ]);

    if (rows.length === 0) return;

    await database.query('DELETE FROM dynamic_voice_channels WHERE guild_id = $1 AND channel_id = $2', [
        tempChannel.guild.id,
        tempChannel.id,
    ]);

    await tempChannel.delete();
};

const createChannel = async (
    joinedChannel: VoiceChannel,
    member: GuildMember | null,
    database: pg.Client,
): Promise<void> => {
    const {
        rows,
    } = await database.query('SELECT * FROM join_to_create_channels WHERE guild_id = $1 AND channel_id = $2', [
        joinedChannel.guild.id,
        joinedChannel.id,
    ]);

    if (rows.length === 0) return;

    const createdChannel = await joinedChannel.guild.channels.create(config.joinToCreate.tempChannelName, {
        type: 'voice',
        parent: joinedChannel.parent ?? undefined,
    });

    await member?.voice.setChannel(createdChannel);

    await database.query('INSERT INTO dynamic_voice_channels VALUES ($1, $2)', [
        createdChannel.guild.id,
        createdChannel.id,
    ]);
};

const registerEvent = (client: Client, database: pg.Client): void => {
    client.on('voiceStateUpdate', (...args) => handle(database, ...args));
};

export default { registerEvent };
