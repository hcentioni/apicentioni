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



//OBTENER DATOS DE UNA ORDEN DESDE LA WEB
const ordenTallerConsultaWebGet = async (CodigoCliente,Nro, IdOrden) => {
    try {
        const OrdenTaller = [];
        console.log(CodigoCliente,Nro, IdOrden)
        const pool = await sql.connect(sqlConfig)
        
        const responseOrden = await pool.request()
            .input('CodigoCliente', sql.VarChar(50), CodigoCliente)
            .input('Nro', sql.VarChar(8), Nro)
            .input('IdOrden', sql.Int, IdOrden)
            .execute('Taller.OrdenesConsultaWeb')

        if (responseOrden.recordsets[0]) {
            
            let IdOrden = responseOrden.recordset[0].IdOrden; 

            const responseOrdenDetalle = await pool.request()
            .input('IdOrden', sql.Int, IdOrden)
            .execute('Taller.OrdenTallerDetalleGet')
                        
            const ordenTaller = responseOrden.recordset[0]

            ordenTaller.Detalle = [];
            ordenTaller.Detalle = responseOrdenDetalle.recordset

            OrdenTaller.push(ordenTaller)

            return OrdenTaller
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

export {ordenTallerGet,ordenTallerConsultaWebGet};