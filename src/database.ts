import pg from 'pg';

export let database: pg.Client;

const connectToDatabase = async (): Promise<void> => {
    database = new pg.Client({
        connectionString: process.env['DATABASE_URL'],
        ssl: { rejectUnauthorized: false },
    });

    await database.connect();
};

export { connectToDatabase };
