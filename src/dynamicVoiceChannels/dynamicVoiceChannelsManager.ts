import { Permissions } from 'discord.js';
import type { Client, Message } from 'discord.js';
import config from '../config';
import { database } from '../database';
import { SQL_CREATE_TABLE_DVC, SQL_CREATE_TABLE_JTC } from './databaseQueries';
import onChannelDelete from './onChannelDelete';
import onVoiceStateUpdate from './onVoiceStateUpdate';
import cmdCreateChannel from './cmdCreateChannel';

const register = async (client: Client): Promise<void> => {
    await database.query(SQL_CREATE_TABLE_JTC);
    await database.query(SQL_CREATE_TABLE_DVC);

    onChannelDelete.registerEvent(client);
    onVoiceStateUpdate.registerEvent(client);
};

const registerCommands = async (command: string, args: string[], message: Message): Promise<void> => {
    if (
        command === config.joinToCreate.command.toLowerCase() &&
        message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
    )
        await cmdCreateChannel.registerCommand(message, args);
};

export { register, registerCommands };
