import "dotenv/config";
import sql from 'mssql'
import { sqlConfig } from '../config/sql';



//OBTENER DE LA BASE DE DATOS LOS USUAIOS
const clienteExiste = async (NroDocumento, idTipoDeDocuemento) => {
    try {
        const pool = await sql.connect(sqlConfig)
        
        const responseCliente = await pool.request()
            .input('cuit', sql.VarChar(20), NroDocumento)
            .input('idTipoDeDocuemento', sql.Int, idTipoDeDocuemento)
            .execute('Licencia.EmpresaGet')
        if (responseCliente.recordsets[0]) {
           console.log(responseCliente.recordsets[0])
            return responseCliente
        } else {
            //EMPRESA NO EXISTE O NO ES UN ASOCIADO
            return 'Cliente_NoExiste'
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

export {clienteExiste};