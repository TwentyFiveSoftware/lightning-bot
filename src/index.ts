import { Client } from 'discord.js';
import dotenv from 'dotenv';
import http from 'http';
import { registerModules } from './registerModules';

dotenv.config();

const client = new Client();

registerModules(client);

client.login(process.env['TOKEN']);

// HTTP SERVER TO PREVENT HEROKU FROM CRASHING
http.createServer((_req, res) => {
    res.end(new Date().toString());
}).listen(process.env['PORT'] || 3000);
