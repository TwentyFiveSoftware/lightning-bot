import type { Client, VoiceChannel, VoiceState } from 'discord.js';
import { database } from '../database';
import { SQL_DELETE_DVC, SQL_INSERT_DVC, SQL_SELECT_DVC, SQL_SELECT_JTC } from './databaseQueries';

const registerEvent = (client: Client): void => {
    client.on('voiceStateUpdate', async (oldState: VoiceState, newState: VoiceState) => {
        if (oldState.channel) await deleteChannel(oldState.channel);
        if (newState.channel) await createChannel(newState);
    });
};

const deleteChannel = async (tempChannel: VoiceChannel) => {
    if (tempChannel.members.size > 0) return;

    const { rows } = await database.query(SQL_SELECT_DVC, [tempChannel.guild.id, tempChannel.id]);
    if (rows.length === 0) return;

    await database.query(SQL_DELETE_DVC, [tempChannel.guild.id, tempChannel.id]);
    await tempChannel.delete();
};

const createChannel = async (newVoiceState: VoiceState): Promise<void> => {
    const joinedChannel = newVoiceState.channel;
    if (!joinedChannel || !newVoiceState.member) return;

    const { rows } = await database.query(SQL_SELECT_JTC, [joinedChannel.guild.id, joinedChannel.id]);
    if (rows.length === 0) return;

    const createdChannel = await joinedChannel.guild.channels.create(rows[0]['temp_channel_name'], {
        type: 'voice',
        parent: joinedChannel.parent ?? undefined,
    });

    await newVoiceState.member?.voice.setChannel(createdChannel);

    await database.query(SQL_INSERT_DVC, [createdChannel.guild.id, createdChannel.id]);

    await createdChannel.lockPermissions();
    await createdChannel.createOverwrite(newVoiceState.member.id, { MANAGE_CHANNELS: true });
};

export default { registerEvent };
