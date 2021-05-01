import type { Client } from 'discord.js';
import sqlite from 'better-sqlite3';
import onChannelCreate from './onChannelCreate';
import onVoiceStateUpdate from './onVoiceStateUpdate';

const register = (client: Client): void => {
    const database = sqlite('./db/dynamicVoiceChannels.db');

    database
        .prepare(
            `
                CREATE TABLE IF NOT EXISTS joinToCreateChannels(
                    guildId VARCHAR,
                    channelId VARCHAR 
                );
            `,
        )
        .run();

    database
        .prepare(
            `
                CREATE TABLE IF NOT EXISTS dynamicVoiceChannels(
                    guildId VARCHAR,
                    channelId VARCHAR 
                );
            `,
        )
        .run();

    onChannelCreate.registerEvent(client, database);
    onVoiceStateUpdate.registerEvent(client, database);
};

export default register;
