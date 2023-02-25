import { Bit, DateTime } from 'mssql';
import {getTickets,addTicket} from '../services/tickets.service'

//OBTENER UNO O TODOS LOS USUARIOS DE UN CLIENTE
const getTicketsCtrl = async (req, res) => {

    const parametros ={
            IdTicket: null,
            IdCliente : null,
            FechaDesde: null,
            FechaHasta: null,
            ConAccion : null,
            EnProceso : null,
            IdContacto : null,
            IdUsuario : null,
            IdEstados : null
    }
    
    if (req.query.IdTicket) {
        parametros.IdTicket = parseInt(req.query.IdTicket);
      };

      if (req.query.IdCliente) {
        parametros.IdCliente = parseInt(req.query.IdCliente);
      };

      if (req.query.FechaDesde) {
        parametros.FechaDesde = req.query.FechaDesde;
      };

      if (req.query.FechaHasta) {
        parametros.FechaHasta = req.query.FechaHasta;
      };

      if (req.query.ConAccion) {
        parametros.ConAccion = parseInt(req.query.ConAccion);
      };
      if (req.query.EnProceso) {
        parametros.EnProceso = parseInt(req.query.EnProceso);
      };
      if (req.query.IdUsuario) {
        parametros.IdUsuario = parseInt(req.query.IdUsuario);
      };
      if (req.query.IdContacto) {
        parametros.IdContacto = parseInt(req.query.IdContacto);
      };
      if (req.query.IdEstados) {
        parametros.IdEstados = req.query.IdEstados;
      };

    const responseUsers = await getTickets(parametros);
    res.status(200);
    res.send(responseUsers);


  }

//AGREGAR UNO TICKET
const addTicketCtrl = async (req, res) => {
  
  //CARGO LAS VARIABLES DEL BODY
  const { IdCliente, Asunto,Mensaje, Archivo,AdjuntoNameOrg, Prioridad,IdCategoria,IdContacto } = req.body;

  //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
  const ticket = {
    IdCliente, Asunto,Mensaje, Archivo,AdjuntoNameOrg, Prioridad,IdCategoria,IdContacto
  }
  //LLAMO AL SERVICIO
  const responseTicket = await addTicket(ticket);
  if (responseTicket==='TICKET_NOT_ADD'){
    res.status(400);
    res.json(responseTicket);
  }else{
    res.status(200);
    res.json(responseTicket);
  }

}

  export {getTicketsCtrl,addTicketCtrl}
  