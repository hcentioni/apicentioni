import "dotenv/config";
import sql from 'mssql'
import { sqlConfig } from '../config/sql';

//OBTENER DE LA BASE DE DATOS LOS ESTADOS DE TICKTS
const getTicketEstados = async (parametros) => {
    
    try {
        const pool = await sql.connect(sqlConfig)
        
        const responseTicketEstados = await pool.request()
            .execute('Taller.TicketsEstadosGet')

        if (responseTicketEstados.recordsets[0]) {
            return responseTicketEstados.recordsets[0]
        } else {
            //userName INCORRECTO
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

export {getTicketEstados}