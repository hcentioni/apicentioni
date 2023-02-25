import { getTicketEstados } from '../services/tickets_estados.service'
//OBTENER UNO O TODOS LOS ESTADOS DE TICKETS
const getTicketEstadosCtrl = async (req, res) => {
  
    const responseEstados = await getTicketEstados();
    if (responseEstados==='DB_ERROR'){
      res.status(400);
      res.json(responseEstados);
    }else{
      res.status(200);
      res.json(responseEstados);
    }
  }

  export {getTicketEstadosCtrl}