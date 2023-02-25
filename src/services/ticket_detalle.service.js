import "dotenv/config";
import sql from 'mssql'
import { sqlConfig } from '../config/sql';

//OBTENER DE LA BASE DE DATOS LOS ESTADOS DE TICKTS
const getTicketDetalle = async (IdTicket) => {

    try {
        const pool = await sql.connect(sqlConfig)
        
        const responseTicketDetalle = await pool.request()

        .input('IdTicket', sql.Int, IdTicket)

            .execute('Taller.TicketDetalleGet')

        if (responseTicketDetalle.recordsets[0]) {
            return responseTicketDetalle.recordsets[0]
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


//AGREGAR UN DETALLE
const addDetalle= async (ticket) => {
    try {
        const pool = await sql.connect(sqlConfig)

        //AGREGO EL CONTACTO A LA BASE DE DATOS
        const responseDetalle = await pool.request()
            .input('IdTicket', sql.Int, ticket.IdTicket)
            .input('Mensaje', sql.VarChar(1000), ticket.Mensaje)
            .input('ComentarioInterno', sql.VarChar(1000), ticket.ComentarioInterno)
            .input('Adjunto', sql.VarChar(100), ticket.Adjunto)
            .input('AdjuntoNameOrg', sql.VarChar(50), ticket.AdjuntoNameOrg)
            .input('IdUsuario', sql.Int, ticket.IdUsuario)
            .input('IdContacto', sql.Int, ticket.IdContacto)


            .execute('Taller.TicketDetalleInsert')

            return 'DETALLE_IS_ADD'

    } catch (err) {
        console.log('DB_ERROR', err)
        return 'DETALLE_NOT_ADD'
    }
};
sql.on('error', err => {
    console.log('DB_ERROR', err)
    return 'DB_ERROR'
})

export {getTicketDetalle,addDetalle}