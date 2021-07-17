import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
import http from 'http';
import { registerModules } from './registerModules';
import { connectToDatabase } from './database';

dotenv.config();

// HTTP SERVER TO PREVENT HEROKU FROM CRASHING
http.createServer((_req, res) => {
    res.end(new Date().toString());
}).listen(process.env['PORT'] || 3000);

const main = async () => {
    await connectToDatabase();

    const client = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
    });

    await registerModules(client);
    await client.login(process.env['TOKEN']);

    client.on('ready', () => console.log(`Ready! Logged in as ${client.user?.tag}`));
};

main();
