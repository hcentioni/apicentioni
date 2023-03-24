import "dotenv/config";
import sql from 'mssql'
import { sqlConfig } from '../config/sql';


//AGREGAR USUARIO
const addToken= async (token) => {
    try {

        const pool = await sql.connect(sqlConfig)

        //AGREGO EL CONTACTO A LA BASE DE DATOS
        const responseUsuarios = await pool.request()
            .input('IdAsociado', sql.Int, token.IdAsociado)
            .input('IdContacto', sql.Int, token.IdContacto)
            .input('IdUsuario', sql.Int, token.IdUsuario)
            .input('IdTecnico', sql.Int, token.IdTecnico)
            .input('endpoint', sql.VarChar(1000), token.endpoint)
            .input('auth', sql.VarChar(1000), token.auth)
            .input('p256dh', sql.VarChar(1000), token.p256dh)
            
            .execute('Mensajeria.TokensInsert')

            return 'TOKEN_IS_ADD'

    } catch (err) {
        console.log('DB_ERROR', err)
        return 'TOKEN_NOT_ADD'
    }
};
sql.on('error', err => {
    console.log('DB_ERROR', err)
    return 'DB_ERROR'
})


//NOTIFICACION NUEVO TICKET CREADO
const getTokens = async (parametros) => {
    
    try {
        const pool = await sql.connect(sqlConfig)
        
        const responseTokens = await pool.request()
            .input('IdAsociado', sql.Int, parametros.IdAsociado)
            .input('IdContacto', sql.Int, parametros.IdContacto)
            .input('IdUsuario', sql.Int, parametros.IdUsuario)
            .input('IdTecnico', sql.Int, parametros.IdTecnico)
            .input('Asociados', sql.Bit, parametros.Asociados)
            .input('Contactos', sql.Bit, parametros.Contactos)
            .input('Usuario', sql.Bit, parametros.Usuario)
            .input('Tecnicos', sql.Bit, parametros.Tecnicos)

            .execute('Mensajeria.TokensGet')

        if (responseTokens.recordsets[0]) {
            return responseTokens.recordsets[0]
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
export {addToken, getTokens}