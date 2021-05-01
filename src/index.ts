import { Client } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client();

client.on('ready', () => console.log('[STATUS] Bot is ready'));

client.login(process.env['TOKEN']);
