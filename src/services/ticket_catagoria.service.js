import "dotenv/config";
import sql from 'mssql'
import { sqlConfig } from '../config/sql';

//OBTENER DE LA BASE DE DATOS LOS ESTADOS DE TICKTS
const getTicketCategorias= async (parametros) => {
    
    try {
        const pool = await sql.connect(sqlConfig)
        
        const responseTicketCategorias = await pool.request()
            .execute('taller.TicketCategoriasGet')

        if (responseTicketCategorias.recordsets[0]) {
            return responseTicketCategorias.recordsets[0]
        } else {
            return 'SIN_RESULTADOS'
        }

    } catch (err) {
        console.log('DB_ERROR', err)
        return 'DB_ERROR'
    }
};
sql.on('error', err => {
    console.log('DB_ERROR', err)
    return 'DB_ERROR'
})

export {getTicketCategorias}