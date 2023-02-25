import "dotenv/config";
import sql from 'mssql'
import { sqlConfig } from '../config/sql';
import { encrypt, verified } from '../utils/bcrypt.handle'
import { generateToken } from "../utils/jwt.handle";

const loginUser = async (userName, userPass) => {
    try {
        const pool = await sql.connect(sqlConfig)

        const responseUsuario = await pool.request()
            .input('userName', sql.VarChar, userName)
            .execute('Licencia.LoginsGet')

        if (responseUsuario.recordsets[0][0]) {
            const isCorrect = await verified(userPass, responseUsuario.recordsets[0][0].userPass)
            if (isCorrect) {
                //LOGIN CORRECTO
                const user ={
                    IdAsociado: responseUsuario.recordsets[0][0].IdAsociado,
                    UserName: responseUsuario.recordsets[0][0].userName,
                    IdUser: responseUsuario.recordsets[0][0].IdClienteContacto,
                    IdCliente: responseUsuario.recordsets[0][0].IdCliente,
                    Contacto:responseUsuario.recordsets[0][0].NombresContacto,
                    Cliente:responseUsuario.recordsets[0][0].NombresCliente
                }
                const token = await generateToken(user)
                const data ={
                    token,
                    user 
                    }
                return data
            } else {
                //LOGIN INCORRECTO
                return 'PASSWORD_INCORRECT'
            }
        } else {
            //userName INCORRECTO
            return 'USER_INCORRECT'
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

const registerNewUser = async () => { };

export { loginUser };