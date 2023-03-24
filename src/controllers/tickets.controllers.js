import {
  getTickets, addTicket,
  takeTicket, cambiarEstadoTicket,
  ticketCerrar, addComentarioTicket, getComentarios, cancelarTicket,
  finalizarTicket, contadorTickets
} from '../services/tickets.service'
import * as nodemailer from 'nodemailer';
import { jConfig, emailFrom } from '../config/mails';
import {isValidEmail} from '../utils/validar'
import { tecnicosGet } from '../services/tecnicos.service'



//OBTENER UNO O TODOS LOS USUARIOS DE UN CLIENTE
const getTicketsCtrl = async (req, res) => {

  const parametros = {
    IdTicket: null,
    IdCliente: null,
    FechaDesde: null,
    FechaHasta: null,
    ConAccion: null,
    EnProceso: null,
    IdContacto: null,
    IdUsuario: null,
    IdEstados: null
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
  const { IdCliente, Asunto, Mensaje, Archivo, AdjuntoNameOrg, Prioridad, IdCategoria, IdContacto } = req.body;

  //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
  const ticket = {
    IdCliente, Asunto, Mensaje, Archivo, AdjuntoNameOrg, Prioridad, IdCategoria, IdContacto
  }
  //LLAMO AL SERVICIO
  const responseTicket = await addTicket(ticket);
  if (responseTicket === 'TICKET_NOT_ADD') {
    res.status(400);
    res.json(responseTicket);
  } else {
    //ENVIO LA NOTIFICACION POR MAIL
    enviarMailNotificacionNuevoTicket(responseTicket.recordset[0])
    //ENVIO LOS MAILS A TECNICOS
    enviarMailNotificacionTecnciosNuevoTicket(responseTicket.recordset[0])

    //RESPONDO LA SOLICITUD
    res.status(200);
    res.json(responseTicket);

  }

}

//TOMAR UNO TICKET
const takeTicketCtrl = async (req, res) => {

  //CARGO LAS VARIABLES DEL BODY
  const { IdTicket, IdUsuario } = req.body;

  //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
  const ticket = {
    IdTicket, IdUsuario
  }
  //LLAMO AL SERVICIO
  const responseTicket = await takeTicket(ticket);
  if (responseTicket === 'TICKET_NOT_TAKE') {
    res.status(400);
    res.json(responseTicket);
  } else {

    res.status(200);
    res.json(responseTicket);

  }
}

//CAMBIAR ESTADO DE UNO TICKET
const cambiarEstadoTicketCtrl = async (req, res) => {

  //CARGO LAS VARIABLES DEL BODY
  const { IdTicket, IdEstado, Prioridad } = req.body;

  //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
  const ticket = {
    IdTicket, IdEstado, Prioridad
  }
  //LLAMO AL SERVICIO
  const responseTicketUpdate = await cambiarEstadoTicket(ticket);
  if (responseTicketUpdate === 'TICKET_NOT_UPDATE') {
    res.status(400);
    res.json(responseTicketUpdate);
  } else {

    res.status(200);
    res.json(responseTicketUpdate);

  }
}

//CERRAR UN TICKET
const ticketCerrarCtrl = async (req, res) => {

  //CARGO LAS VARIABLES DEL BODY
  const { IdTicket, Solucion } = req.body;

  //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
  const ticket = {
    IdTicket, Solucion
  }
  //LLAMO AL SERVICIO
  const responseTicketClosed = await ticketCerrar(ticket);
  if (responseTicketClosed === 'TICKET_NOT_CLOSED') {
    res.status(400);
    res.json(responseTicketClosed);
  } else {

    res.status(200);
    res.json(responseTicketClosed);

  }
}

//CREAR UN COMENTARIO DEL TICKET
const addComentarioTicketCtrl = async (req, res) => {

  //CARGO LAS VARIABLES DEL BODY
  const { IdTicket, IdUsuario, Comentario } = req.body;

  //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
  const comentario = {
    IdTicket, IdUsuario, Comentario
  }

  //LLAMO AL SERVICIO
  const responseComentario = await addComentarioTicket(comentario);
  if (responseComentario === 'TICKET_NOT_COMENTARIO') {
    res.status(400);
    res.json(responseComentario);
  } else {

    res.status(200);
    res.json(responseComentario);

  }
}


//OBTENER LOS COMENTARIOS DEL TICKET
const comentariosGetCtrl = async (req, res) => {

  const IdTicket = req.params.id;

  const responseComentarios = await getComentarios(IdTicket);
  res.status(200);
  res.send(responseComentarios);


}


//CANCELAR UN TICKET TICKET
const cancelarTicketCtrl = async (req, res) => {

  //CARGO LAS VARIABLES DEL BODY
  const { IdTicket, IdUsuarioCancela, Comentario } = req.body;

  //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
  const ticket = {
    IdTicket, IdUsuarioCancela, Comentario
  }

  //LLAMO AL SERVICIO
  const responseCancelar = await cancelarTicket(ticket);
  if (responseCancelar === 'TICKET_IS_CANCELADO') {

    res.status(200);
    res.json(responseCancelar);

  } else {

    res.status(400);
    res.json(responseCancelar);

  }
}

//FINALIZAR UN TICKET TICKET
const finalizarTicketCtrl = async (req, res) => {

  //CARGO LAS VARIABLES DEL BODY
  const { IdTicket, IdUsuarioFinaliza, Solucion } = req.body;

  //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
  const ticket = {
    IdTicket, IdUsuarioFinaliza, Solucion
  }

  //LLAMO AL SERVICIO
  const responseFinalizado = await finalizarTicket(ticket);
  if (responseFinalizado === 'TICKET_IS_FINALIZADO') {

    res.status(200);
    res.json(responseFinalizado);

  } else {

    res.status(400);
    res.json(responseFinalizado);

  }
}

//OBTENER LOS CONTADORES DE TICKET
const contadorTicketGetCtrl = async (req, res) => {

  const responseContador = await contadorTickets();
  res.status(200);
  res.send(responseContador);


}


//NOTIFICACIONES 

//NUEVO TICKET
function enviarMailNotificacionNuevoTicket(ticket) {
  //console.log('Llega', ticket)
  try {

    //ENVIO DE MAILS
    let email = {
      from: emailFrom.from,  //remitente
      to: ticket.emailContacto, //destinatario
      subject: "Nuevo Ticket Generado",  //asunto del correo
      html:
        ` 
      <table border="0" width="600" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr>
<td align="center" valign="top">
<table border="0" width="590" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td align="left" valign="middle">
<table border="0" width="150" cellspacing="0" cellpadding="0" align="left">
<tbody>
<tr>
<td align="right" valign="middle">
<table border="0" cellspacing="0" cellpadding="0" align="left">
<tbody>
<tr>
<td align="center" valign="middle" width="auto" height="37"><a title="Centioni Servicios Inform&aacute;ticos SRL" href="https://www.centioni.com.ar" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://donweb.com&amp;source=gmail&amp;ust=1679664332081000&amp;usg=AOvVaw1E1AxAx2hDwuARKJju12JM">Centioni</a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
<td align="right" valign="middle">
<p><strong>Tu n&uacute;mero de ticket es: ${ticket.IdTicket}</strong><br />&nbsp;&nbsp;<a title="Mesa de Ayuda" href="https://soporte.centioni.com.ar/" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://micuenta.donweb.com/soporte/ayuda?utm_source%3Demail-sistema%26utm_medium%3Demail-sistema%26utm_campaign%3D&amp;source=gmail&amp;ust=1679664332081000&amp;usg=AOvVaw09VPg8k_duZo-VZpMiPPEb">Mesa de Ayuda</a></p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td align="left" valign="top" height="10">&nbsp;</td>
</tr>
<tr>
<td>
<table border="0" width="600" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td colspan="2" align="left" valign="top" bgcolor="#22AAE4" height="10">&nbsp;</td>
<td align="right" valign="top" bgcolor="#22AAE4" width="10" height="10">&nbsp;</td>
</tr>
<tr>
<td align="left" valign="top" bgcolor="#22AAE4" width="10" height="20">&nbsp;</td>
<td align="left" valign="middle" bgcolor="#22AAE4">&nbsp;Estado de tu consulta</td>
<td align="right" valign="top" bgcolor="#22AAE4" width="10">&nbsp;</td>
</tr>
<tr>
<td colspan="3" align="left" valign="top" bgcolor="#22AAE4" height="10">&nbsp;</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td bgcolor="#FFFFFF" height="20">&nbsp;</td>
</tr>
<tr>
<td align="center" valign="top" bgcolor="#FFFFFF">
<table border="0" width="600" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td width="30">&nbsp;</td>
<td align="left" valign="top">
<h2>${ticket.contactoApellido} ${ticket.contactoNombre},</h2>
<p>Simplemente quiero informarte que ya hemos recibido tu consulta y nos encontramos trabajando en ella para darte una r&aacute;pida respuesta, acorde a tu necesidad. Te pido por favor aguardes la misma. Muchas gracias por contactarte.</p>
<pre>Quedo a tu disposici&oacute;n y te agradezco califiques mi respuesta porque nos ayudar&aacute; a mejorar la calidad de atenci&oacute;n.

------------------------------<wbr />------------------------------<wbr />--------

Equipo de soporte - Centioni Servicios Informáticos S.R.L
------------------------------<wbr />------------------------------<wbr />--------</pre>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
      
  `
    };
    //


    let createTransport = nodemailer.createTransport(jConfig);

    //

    createTransport.sendMail(email, function (error, info) {
      if (error) {
        console.log("Error al enviar email", error);
      } else {
        console.log("Correo enviado correctamente");
      }
      createTransport.close();
    });

  } catch (error) {
    console.log(error);
  }
}


//OBTENER UNO O TODOS LOS USUARIOS DE UN CLIENTE
const enviarMailNotificacionTecnciosNuevoTicket = async (ticket) => {

  const responseTecnicos = await tecnicosGet(null, 1);
  const plantilla =
    `<p>
  <table border="0" width="600" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td align="center" valign="top">
  <table border="0" width="590" cellspacing="0" cellpadding="0">
  <tbody>
  <tr>
  <td align="left" valign="middle">
  <table border="0" width="150" cellspacing="0" cellpadding="0" align="left">
  <tbody>
  <tr>
  <td align="right" valign="middle">
  <table border="0" cellspacing="0" cellpadding="0" align="left">
  <tbody>
  <tr>
  <td align="center" valign="middle" width="auto" height="37"><a title="Centioni Servicios Inform&aacute;ticos SRL" href="https://www.centioni.com.ar" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://donweb.com&amp;source=gmail&amp;ust=1679664332081000&amp;usg=AOvVaw1E1AxAx2hDwuARKJju12JM">Centioni</a></td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  <td align="right" valign="middle">
  <p><strong>Tu n&uacute;mero de ticket es: ${ticket.IdTicket}</strong><br />&nbsp;&nbsp;<a title="Mesa de Ayuda" href="https://soporte.centioni.com.ar/" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://micuenta.donweb.com/soporte/ayuda?utm_source%3Demail-sistema%26utm_medium%3Demail-sistema%26utm_campaign%3D&amp;source=gmail&amp;ust=1679664332081000&amp;usg=AOvVaw09VPg8k_duZo-VZpMiPPEb">Mesa de Ayuda</a></p>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  <tr>
  <td align="left" valign="top" height="10">&nbsp;</td>
  </tr>
  <tr>
  <td>
  <table border="0" width="600" cellspacing="0" cellpadding="0">
  <tbody>
  <tr>
  <td colspan="2" align="left" valign="top" bgcolor="#22AAE4" height="10">&nbsp;</td>
  <td align="right" valign="top" bgcolor="#22AAE4" width="10" height="10">&nbsp;</td>
  </tr>
  <tr>
  <td align="left" valign="top" bgcolor="#22AAE4" width="10" height="20">&nbsp;</td>
  <td align="left" valign="middle" bgcolor="#22AAE4">SE GENERO UN NUEVO TICKET</td>
  <td align="right" valign="top" bgcolor="#22AAE4" width="10">&nbsp;</td>
  </tr>
  <tr>
  <td colspan="3" align="left" valign="top" bgcolor="#22AAE4" height="10">&nbsp;</td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  <tr>
  <td bgcolor="#FFFFFF" height="20">&nbsp;</td>
  </tr>
  <tr>
  <td align="center" valign="top" bgcolor="#FFFFFF">
  <table border="0" width="600" cellspacing="0" cellpadding="0">
  <tbody>
  <tr>
  <td style="width: 0px;">&nbsp;</td>
  <td style="width: 877.5px;" align="left" valign="top">
  <h2>${ticket.RazonSocial}</h2>
  <h2>${ticket.contactoApellido} ${ticket.contactoNombre},</h2>
  <p>Se genero un nuevo ticket Nro:${ticket.IdTicket}</p>
  <p>Prioridad: ${ticket.Prioridad}</p>
  <p>Categoria: ${ticket.Categoria}</p>
  <p>Asunto: ${ticket.Asunto}</p>
  <p>Falla: ${ticket.Mensaje}</p>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>`
  try {
    responseTecnicos.recordset.forEach(element => {
      if (isValidEmail(element.email)){
        console.log('Enviado a: ',element.email)
          //POR CADA TECNICO ACTIVO LE ENVIO UN MENSAJE
      let email = {
        from: emailFrom.from,  //remitente
        to: element.email,  //destinatario
        subject: "Nuevo Ticket Generado",  //asunto del correo
        html: plantilla
      };
      let createTransport = nodemailer.createTransport(jConfig);
      createTransport.sendMail(email, function (error, info) {
        if (error) {
          console.log("Error al enviar email a: ",element.email);
        } else {
          console.log("Correo enviado correctamente a: ", element.email);
        }
        createTransport.close();
      });
      }
    });

  } catch (error) {
    console.log(error);
  }
}

//EXPORTO LAS FUNCIONES
export {
  getTicketsCtrl, addTicketCtrl, takeTicketCtrl,
  cambiarEstadoTicketCtrl, ticketCerrarCtrl, addComentarioTicketCtrl,
  comentariosGetCtrl, cancelarTicketCtrl, finalizarTicketCtrl, contadorTicketGetCtrl
}
