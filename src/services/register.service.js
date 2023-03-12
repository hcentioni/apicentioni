import "dotenv/config";
import sql from 'mssql'
import { sqlConfig } from '../config/sql';
import { encrypt } from '../utils/bcrypt.handle'


//VERIFICO SI EXISTE EL LOGIN
const existUser= async (userName) => {
   
    try {
        const pool = await sql.connect(sqlConfig)
        
        const responseUsuarios = await pool.request()
            .input('userName', sql.VarChar(50), userName)

            .execute('Licencia.LoginsExiste')
            
            if(responseUsuarios.recordsets[0][0].Existe=='1'){
                return 'USER_IS_EXIST'
            }
            else{
                return 'USER_IS_NOT_EXIST'
            }

    } catch (err) {
        console.log('DB_ERROR', err)
        return 'USER_NOT_DELETE'
    }
};
sql.on('error', err => {
    console.log('DB_ERROR', err)
    return 'DB_ERROR'
})

//AGREGAR USUARIO
const addUser= async (user) => {

    try {

        const passHash = await encrypt(user.Pass, 8)
        
        const pool = await sql.connect(sqlConfig)

        //AGREGO EL CONTACTO A LA BASE DE DATOS
        const responseUsuarios = await pool.request()
            .input('Nombre', sql.VarChar(50), user.Nombre)
            .input('Apellido', sql.VarChar(50), user.Apellido)
            .input('Area', sql.VarChar(50), user.Area)
            .input('Puesto', sql.VarChar(50), user.Puesto)
            .input('Pass', sql.VarChar(500), passHash)
            .input('Login', sql.VarChar(50), user.Login)
            .input('IdCliente', sql.Int, user.IdCliente)
            .input('Dni', sql.VarChar(50), user.Dni)

            .execute('Venta.ClienteContactoInsert')

            return 'USER_IS_ADD'

    } catch (err) {
        console.log('DB_ERROR', err)
        return 'USER_NOT_ADD'
    }
};
sql.on('error', err => {
    console.log('DB_ERROR', err)
    return 'DB_ERROR'
})

export {addUser,existUser}