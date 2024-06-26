import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    timezone: process.env.DB_TIMEZONE,
});

export default sequelize;