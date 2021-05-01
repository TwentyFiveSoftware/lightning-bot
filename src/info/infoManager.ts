import type { Client } from 'discord.js';
import onReady from './onReady';

const register = (client: Client): void => {
    onReady.registerEvent(client);
};

export default register;
