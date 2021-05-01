import { IEvent } from '../types/Event';

const event: IEvent = {
    name: 'ready',
    execute: client => {
        console.log(`Ready! Logged in as ${client.user?.tag}`);
    },
};

export default event;
