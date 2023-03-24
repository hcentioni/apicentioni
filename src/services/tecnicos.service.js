import "dotenv/config";
import sql from 'mssql'
import { sqlConfig } from '../config/sql';


//OBTENER DE LA BASE DE DATOS LOS USUAIOS
const tecnicosGet = async (IdTecnico, Activo) => {
    try {
        const pool = await sql.connect(sqlConfig)

        const responseTecnicos = await pool.request()
            .input('IdTecnico', sql.Int, IdTecnico)
            .input('Activo', sql.Bit, Activo)
            .execute('Taller.TecnicosGet')
        if (responseTecnicos.recordsets[0]) {
           
            return responseTecnicos
        } else {
            //EMPRESA NO EXISTE O NO ES UN ASOCIADO
            return 'Tecnicos_NoExiste'
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

export {tecnicosGet};