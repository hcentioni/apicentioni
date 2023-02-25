import { getTicketCategorias } from '../services/ticket_catagoria.service'

//OBTENER TODAS LAS CATEGORIAS DE TICKETS
const getTicketCategoriasCtrl = async (req, res) => {
  
    const responseCategorias = await getTicketCategorias();
    if (responseCategorias==='DB_ERROR'){
      res.status(400);
      res.json(responseCategorias);
    }else{
      res.status(200);
      res.json(responseCategorias);
    }
  }

  export {getTicketCategoriasCtrl}