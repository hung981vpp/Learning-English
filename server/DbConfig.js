// server/dbConfig.js
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: 63504,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

module.exports = config;