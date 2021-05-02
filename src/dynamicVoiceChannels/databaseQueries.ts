export const SQL_CREATE_TABLE_JTC = `
    CREATE TABLE IF NOT EXISTS join_to_create_channels(
        guild_id VARCHAR,
        channel_id VARCHAR,
        temp_channel_name VARCHAR
    );
`;

export const SQL_CREATE_TABLE_DVC = `
    CREATE TABLE IF NOT EXISTS dynamic_voice_channels(
        guild_id VARCHAR,
        channel_id VARCHAR 
    );
`;

export const SQL_SELECT_DVC = `SELECT * FROM dynamic_voice_channels WHERE guild_id = $1 AND channel_id = $2`;
export const SQL_INSERT_DVC = `INSERT INTO dynamic_voice_channels VALUES ($1, $2)`;
export const SQL_DELETE_DVC = `DELETE FROM dynamic_voice_channels WHERE guild_id = $1 AND channel_id = $2`;

export const SQL_SELECT_JTC = `SELECT * FROM join_to_create_channels WHERE guild_id = $1 AND channel_id = $2`;
export const SQL_INSERT_JTC = `INSERT INTO join_to_create_channels VALUES ($1, $2, $3)`;
export const SQL_DELETE_JTC = `DELETE FROM join_to_create_channels WHERE guild_id = $1 AND channel_id = $2`;
