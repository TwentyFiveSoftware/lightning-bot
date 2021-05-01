import type { Client, Channel } from 'discord.js';

const registerEvent = (client: Client): void => {
    client.on(
        'channelCreate',
        async (channel: Channel): Promise<void> => {
            if (channel.type !== 'voice') return;
        },
    );
};

export default { registerEvent };
