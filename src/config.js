import {config} from 'dotenv'
config();

export default {
    port: process.env.PORT,
    secret: process.env.SECRETO,
    dbuser: process.env.DBuser,
    dbpass: process.env.DBpass,
    dbcatalogo: process.env.dbcatalogo,
    dbserver: process.env.DBserver,
    dbport: process.env.DBport,
    DBencrypt: process.env.DBencrypt,
    DBtrustServerCertificate: process.env.DBtrustServerCertificate,
}