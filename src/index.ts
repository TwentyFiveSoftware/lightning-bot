import { Client } from 'discord.js';
import dotenv from 'dotenv';
import { registerModules } from './registerModules';
import fs from 'fs';
import http from 'http';

dotenv.config();
if (!fs.existsSync('db')) fs.mkdirSync('db');

const client = new Client();

registerModules(client);

client.login(process.env['TOKEN']);

// HTTP SERVER TO PREVENT HEROKU FROM CRASHING
http.createServer((_req, res) => {
    res.end(new Date().toString());
}).listen(process.env['PORT'] || 3000);
