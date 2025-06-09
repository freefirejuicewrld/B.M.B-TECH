const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0hpS1dIVU51VmhDOHhhSDR4aFBNNUp3aWNicWpDQmJod29XNThhZjAwWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV2NuU2lXV04rdjBHQktDVjRIWDFsdHI3Y0c3NFZ5ZjRDOVJ6OVNpQjFGWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjSlA5UjY4cjNtRFFUcWtxN3MrNHYwdjFTSW12OGhDQ29GRCsvR043bEdvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyR3NXbU1LU25QV0FQRlF4VzdzdEdheVlxa3p3WTI5dklaRlRrSlVuUGlzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFGb3pGZGM4YmxkSXo2dVdRbkNVeXVWcDN4NHRTY3RTV2RvRkZFYTEwMjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBhbTVIaEZTeUg0V0tpUVRHVXN2SkxmMUZzaXl6OFc2MDhpbCtXb2VEM0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk95R3lveVczbGMvRjdpRzNJWFl5MEdwcnBpM1hJY3NjWllTQWx1T3dHST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUo5cW5waWFXWXQrUDlaeGlXNjFJaUJLUFYvUU1ja3lINDhLY0xJUzBSVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZ4S2FkT01vUEh2RGdwUFl0VFVrNlhEWEhwNWd6VzJ5cFFPRVJ0akNXRmZ6YVZEUGU2MVZ2VlVEcWZaQW5vekRPNjhjMTdsMmduSjdMVHREclZxOGl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjYsImFkdlNlY3JldEtleSI6InljNkt0RU1MekZjRk1FZlNFV0RXMDR3VHJaVThWS1hpb3J5OTlHMGFJS3c9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODEzMzUyMjA4M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5Qjc0NjIzMTFFODQ0RTZDMzNDRjUzRkYxOUE3MDU4MiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5NDQxNTU2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MTMzNTIyMDgzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkM3NDE2OUNEMzdCN0NBRTk2NkU1OEFDRDE4QkExN0U4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDk0NDE1NTl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IlY4WTZFSDFEIiwibWUiOnsiaWQiOiIyMzQ4MTMzNTIyMDgzOjI2QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjYxMzE5MTY1MDE0MTA1OjI2QGxpZCIsIm5hbWUiOiJBbm9ueW1vdXMifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0w2WWxLSUJFSVM0bWNJR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkFTZFJibW5lRytqTFA0dnRjZSsxc05MQU9LcElhVEFnclNaN3BYbUQxMTA9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlkwVm8rQ0h3SFoweE5lanpiS0hzUFFJU3ZCcXBnbWkrRTNyaGpkWFkzSFpOSVg4Y3VGZzZMaDVxQlRCUkNrVURieHFrVFAyREtzV21xMHpYMVlleENnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI2MmQ4MEpCY2Rnc3c0eTkvUUxKT2J4VFlYVDRzbElLR0RRVjZTNy8yZ3VBVEpOemkzaERUUHNmOGQ4dE5BQW9MVytad3pWNlQzQjVqMGh3K3FUQXFoQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxMzM1MjIwODM6MjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUUVuVVc1cDNodm95eitMN1hIdnRiRFN3RGlxU0drd0lLMG1lNlY1ZzlkZCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ5NDQxNTUzLCJsYXN0UHJvcEhhc2giOiIyUDFZaGYiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9sOCJ9',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "Anonymous",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 𝙱.𝙼.𝙱-𝚇𝙼𝙳 ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Anonymous-Bot',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'no',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

