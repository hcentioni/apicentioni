import "dotenv/config";
import sql from 'mssql'

const sqlConfig = {
    user: process.env.DBuser || '',
    password: process.env.DBpass || '',
    database: process.env.DBcatalogo || '',
    server: process.env.DBserver || '',
    port: 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}

export function createCn() {
    let con = sql.connect(sqlConfig)
    return con
}

export {sqlConfig}
