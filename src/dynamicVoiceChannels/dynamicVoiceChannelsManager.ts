import type { Client } from 'discord.js';
import onChannelCreate from './onChannelCreate';

const register = (client: Client): void => {
    onChannelCreate.registerEvent(client);
};

export default register;
