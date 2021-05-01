import { Client } from 'discord.js';
import dotenv from 'dotenv';
import { registerModules } from './registerModules';

dotenv.config();

const client = new Client();

registerModules(client);

client.login(process.env['TOKEN']);
