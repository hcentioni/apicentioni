import { getTicketDetalle, addDetalle } from '../services/ticket_detalle.service'
//OBTENER UNO O TODOS LOS ESTADOS DE TICKETS
const getTicketDetalleCtrl = async (req, res) => {

  let IdTicket = req.params.id;

  const responseDetalle = await getTicketDetalle(IdTicket);
  if (responseDetalle === 'DB_ERROR') {
    res.status(400);
    res.json(responseDetalle);
  } else {
    res.status(200);
    res.json(responseDetalle);
  }
}

//AGREGAR UNO DETALLE
const addDetalleCtrl = async (req, res) => {

  //CARGO LAS VARIABLES DEL BODY
  const { IdTicket,
    Mensaje,
    ComentarioInterno,
    Adjunto,
    IdUsuario,
    AdjuntoNameOrg,
    IdContacto } = req.body;

    
  //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
  const ticket = {
    IdTicket,
    Mensaje,
    ComentarioInterno,
    Adjunto,
    IdUsuario,
    AdjuntoNameOrg,
    IdContacto
  }

  //LLAMO AL SERVICIO
  const responseDetalle = await addDetalle(ticket);
  if (responseDetalle === 'DETALLE_NOT_ADD') {
    res.status(400);
    res.json(responseDetalle);
  } else {
    res.status(200);
    res.json(responseDetalle);
  }

}
export { getTicketDetalleCtrl, addDetalleCtrl }