import "dotenv/config";
import sql from 'mssql'
import { sqlConfig } from '../config/sql';


//OBTENER DE LA BASE DE DATOS LOS TICKETS
const getTickets = async (parametros) => {
    
    try {
        const pool = await sql.connect(sqlConfig)
        
        const responseUsuarios = await pool.request()
            .input('IdTicket', sql.Int, parametros.IdTicket)
            .input('IdCliente', sql.Int, parametros.IdCliente)
            .input('FechaDesde', sql.DateTime, parametros.FechaDesde)
            .input('FechaHasta', sql.DateTime, parametros.FechaHasta)
            .input('ConAccion', sql.Bit, parametros.ConAccion)
            .input('EnProceso', sql.Bit, parametros.EnProceso)
            .input('IdContacto', sql.Int, parametros.IdContacto)
            .input('IdUsuario', sql.Int, parametros.IdUsuario)
            .input('IdEstados', sql.VarChar(50), parametros.IdEstados)
            .execute('Taller.TicketsGet')

        if (responseUsuarios.recordsets[0]) {
            return responseUsuarios.recordsets[0]
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

//AGREGAR TICKET
const addTicket= async (ticket) => {
    try {
        const pool = await sql.connect(sqlConfig)

        //AGREGO EL CONTACTO A LA BASE DE DATOS
        const responseUsuarios = await pool.request()
            .input('IdCliente', sql.Int, ticket.IdCliente)
            .input('Asunto', sql.VarChar(50), ticket.Asunto)
            .input('Mensaje', sql.VarChar(500), ticket.Mensaje)
            .input('Archivo', sql.VarChar(250), ticket.Archivo)
            .input('AdjuntoNameOrg', sql.VarChar(50), ticket.AdjuntoNameOrg)
            .input('Prioridad', sql.Int, ticket.Prioridad)
            .input('IdCategoria', sql.Int, ticket.IdCategoria)
            .input('IdContacto', sql.Int, ticket.IdContacto)


            .execute('Taller.TicketsInsert')

            return 'TICKET_IS_ADD'

    } catch (err) {
        console.log('DB_ERROR', err)
        return 'TICKET_NOT_ADD'
    }
};
sql.on('error', err => {
    console.log('DB_ERROR', err)
    return 'DB_ERROR'
})


export {getTickets,addTicket}