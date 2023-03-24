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
        
            return responseUsuarios

    } catch (err) {
        console.log('DB_ERROR', err)
        return 'TICKET_NOT_ADD'
    }
};
sql.on('error', err => {
    console.log('DB_ERROR', err)
    return 'DB_ERROR'
})

//TOMAR UN TICKET

const takeTicket= async (ticket) => {
    try {
        const pool = await sql.connect(sqlConfig)

        //AGREGO EL CONTACTO A LA BASE DE DATOS
        const responseUsuarios = await pool.request()
            .input('IdTicket', sql.Int, ticket.IdTicket)
            .input('IdUsuario', sql.Int, ticket.IdUsuario)

            .execute('Taller.TicketsAsignar')

            return 'TICKET_IS_TAKE'

    } catch (err) {
        console.log('DB_ERROR', err)
        return 'TICKET_NOT_TAKE'
    }
};
sql.on('error', err => {
    console.log('DB_ERROR', err)
    return 'DB_ERROR'
})


//actualizar estado y prioridad DE UN TICKET
const cambiarEstadoTicket= async (ticket) => {
    try {
        const pool = await sql.connect(sqlConfig)

        //AGREGO EL CONTACTO A LA BASE DE DATOS
        const responseUpdateTicket = await pool.request()
            .input('IdTicket', sql.Int, ticket.IdTicket)
            .input('IdEstado', sql.Int, ticket.IdEstado)
            .input('Prioridad', sql.Int, ticket.Prioridad)

            .execute('[Taller].[TicketsUpdate]')

            return 'TICKET_IS_UPDATE'
 
    } catch (err) {
        console.log('DB_ERROR', err)
        return 'TICKET_NOT_UPDATE'
    }
};
sql.on('error', err => {
    console.log('DB_ERROR', err)
    return 'DB_ERROR'
})


//CERRAR UN TICKET

const ticketCerrar= async (ticket) => {
    try {
        const pool = await sql.connect(sqlConfig)

        //AGREGO EL CONTACTO A LA BASE DE DATOS
        const responseTicketClosed = await pool.request()
            .input('IdTicket', sql.Int, ticket.IdTicket)
            .input('Solucion', sql.VarChar(4000), ticket.Solucion)

            .execute('Taller.TicketsCerrar')

            return 'TICKET_IS_CLOSED'
 
    } catch (err) {
        console.log('DB_ERROR', err)
        return 'TICKET_NOT_CLOSED'
    }
};
sql.on('error', err => {
    console.log('DB_ERROR', err)
    return 'DB_ERROR'
})

//CERRAR UN COMENTARIO DEL TICKET
const addComentarioTicket= async (comentario) => {
    try {
        const pool = await sql.connect(sqlConfig)

        //AGREGO EL CONTACTO A LA BASE DE DATOS
        const responseTicketClosed = await pool.request()
            .input('IdTicket', sql.Int, comentario.IdTicket)
            .input('IdUsuario', sql.Int, comentario.IdUsuario)
            .input('Comentario', sql.VarChar(4000), comentario.Comentario)

            .execute('Taller.TicketsComentarioInsert')

            return 'TICKET_IS_COMENTARIO'

    } catch (err) {
        console.log('DB_ERROR', err)
        return 'TICKET_NOT_COMENTARIO'
    }
};
sql.on('error', err => {
    console.log('DB_ERROR', err)
    return 'DB_ERROR'
})

//OBTENER LOS COMENTARIOS DE UN TICKET
const getComentarios = async (id) => {
    
    try {
        const pool = await sql.connect(sqlConfig)

        const responseComentarios = await pool.request()
            .input('IdTicket', sql.Int, id)
            .execute('Taller.TicketsComentariosGet')

        if (responseComentarios.recordsets[0]) {
            return responseComentarios.recordsets[0]
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

//CANCELAR UN TICKET
const cancelarTicket = async (ticket) => {
    
    try {
        const pool = await sql.connect(sqlConfig)


        const responseComentarios = await pool.request()
            .input('IdTicket', sql.Int, ticket.IdTicket)
            .input('IdUsuarioCancela', sql.Int, ticket.IdUsuarioCancela)
            .input('Comentario', sql.VarChar(4000), ticket.Comentario)
            .execute('[Taller].[TicketsCancelar]')

            return 'TICKET_IS_CANCELADO'

    } catch (err) {
        console.log('DB_ERROR', err)
        return 'DB_ERROR'
    }
};
sql.on('error', err => {
    console.log('DB_ERROR', err)
    return 'DB_ERROR'
})
 
//CANCELAR UN TICKET
const finalizarTicket = async (ticket) => {
    
    try {
        const pool = await sql.connect(sqlConfig)


        const responseComentarios = await pool.request()
            .input('IdTicket', sql.Int, ticket.IdTicket)
            .input('IdUsuarioFinaliza', sql.Int, ticket.IdUsuarioFinaliza)
            .input('Solucion', sql.VarChar(4000), ticket.Solucion)
            .execute('[Taller].[TicketsFinalizar]')

            return 'TICKET_IS_FINALIZADO'

    } catch (err) {
        console.log('DB_ERROR', err)
        return 'DB_ERROR'
    }
};
sql.on('error', err => {
    console.log('DB_ERROR', err)
    return 'DB_ERROR'
})

//CONTADOR DE TICKET
const contadorTickets = async () => {
    
    try {
        const pool = await sql.connect(sqlConfig)


        const responseContador = await pool.request()
            .execute('Taller.TicketsContadorGet')

            return responseContador.recordset

    } catch (err) {
        console.log('DB_ERROR', err)
        return 'DB_ERROR'
    }
};
sql.on('error', err => {
    console.log('DB_ERROR', err)
    return 'DB_ERROR'
})
export {getTickets,addTicket,takeTicket,cambiarEstadoTicket,ticketCerrar,
    addComentarioTicket,getComentarios,cancelarTicket,finalizarTicket,contadorTickets}