import { getTicketDetalle, addDetalle } from '../services/ticket_detalle.service'
import { jConfig, emailFrom } from '../config/mails';
import { isValidEmail } from '../utils/validar'
import { getTickets } from '../services/tickets.service'
import * as nodemailer from 'nodemailer';

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
    notificarMensajeRespondido(ticket)
    res.status(200);
    res.json(responseDetalle);
  }

}


//NOTIFICACIONES POR MAILS
const notificarMensajeRespondido = async (ticket) => {

  const parametros = {
    IdTicket: ticket.IdTicket
  }

  const responseTicket = await getTickets(parametros);

  //console.log('Datos del ticket: ', responseTicket);

  const plantilla =
    `<h1 style="text-align:center"><span style="font-size:22px"><strong>Mesa De Ayuda Mensaje Respondido</strong></span></h1>

    <p>El usuario : ${responseTicket[0].contactoApellido} ${responseTicket[0].contactoNombre} perteneciente al cliente ${responseTicket[0].RazonSocial}</p>
    
    <p>Respondio: ${ticket.Mensaje}</p>
    
    <p>&nbsp;</p>`
  try {
    if (isValidEmail(responseTicket[0].emailUsuario)) {
      let email = {
        from: emailFrom.from,  //remitente
        to: responseTicket[0].emailUsuario,  //destinatario
        subject: "Ticket Respondido",  //asunto del correo
        html: plantilla
      };
      let createTransport = nodemailer.createTransport(jConfig);
      createTransport.sendMail(email, function (error, info) {
        if (error) {
          console.log("Error al enviar email a: ", responseTicket[0].emailUsuario);
        } else {
          console.log("Correo enviado correctamente a: ", responseTicket[0].emailUsuario);
        }
        createTransport.close();
      });
    }
  } catch (error) {
    console.log(error);
  }
}





export { getTicketDetalleCtrl, addDetalleCtrl }