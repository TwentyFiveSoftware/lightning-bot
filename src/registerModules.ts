import type { Client } from 'discord.js';
import infoManager from './info/infoManager';
import dynamicVoiceChannelsManager from './dynamicVoiceChannels/dynamicVoiceChannelsManager';

const registerModules = (client: Client): void => {
    infoManager(client);
    dynamicVoiceChannelsManager(client);
};

export { registerModules };
