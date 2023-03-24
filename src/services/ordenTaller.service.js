import "dotenv/config";
import sql from 'mssql'
import { sqlConfig } from '../config/sql';



//OBTENER DE LA BASE DE DATOS LOS USUAIOS
const ordenTallerGet = async (IdOrden) => {
    try {
        const pool = await sql.connect(sqlConfig)
        
        const responseOrden = await pool.request()
            .input('IdOrden', sql.Int, IdOrden)
            .execute('Taller.OrdenDeTallerGetOne')
        if (responseOrden.recordsets[0]) {
            return responseOrden
        } else {
            //EMPRESA NO EXISTE O NO ES UN ASOCIADO
            return 'Orden_NoExiste'
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

export {ordenTallerGet};