import express from 'express';
import config from './config';
import cors from 'cors';
import bodyParser from 'body-parser'

//IMPORTO LAS RUTAS
import login from './routes/login.routes';
import auth from './routes/auth.routes';
import users from './routes/users.routes';
import tickets from './routes/tickets.routes';
import ticketsestados from './routes/ticketsestados.routes';
import ticketcategorias from './routes/ticketcategorias.routes';
import ticketdetalle from './routes/ticketdetalle.routes'
import upload from './routes/upload.routes'
import save from './routes/save.routes'
import cliente from './routes/cliente.routes'
import register from './routes/register.routes'

const PORT = config.port || 3001;
const app = express();

app.use(bodyParser.json());
import morgan from 'morgan'

app.use(cors());
app.use(morgan('dev'));

app.use(
    login,
    auth,
    tickets,
    users,
    ticketsestados,
    ticketcategorias,
    ticketdetalle,
    upload,
    save,
    cliente,
    register
    );

    app.use(express.static('./public'))

app.listen(PORT, ()=> console.log(`Servidor listo en el puerto: ${PORT}`));
