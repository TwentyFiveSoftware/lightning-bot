import { Client } from 'discord.js';
import dotenv from 'dotenv';
import { registerModules } from './registerModules';
import fs from 'fs';

dotenv.config();
if (!fs.existsSync('db')) fs.mkdirSync('db');

const client = new Client();

registerModules(client);

client.login(process.env['TOKEN']);
