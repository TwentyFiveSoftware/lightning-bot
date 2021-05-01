import { Client } from 'discord.js';
import dotenv from 'dotenv';
import { registerEvents } from './eventHandler';

dotenv.config();

const client = new Client();

registerEvents(client);

client.login(process.env['TOKEN']);
