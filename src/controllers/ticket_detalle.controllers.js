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
  
  const plantilla =
  `<table border="0" width="600" cellspacing="0" cellpadding="0" align="center">
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
<p>El equipo de soporte ha respondido a tu consulta. Por favor ingresa a la mesa de ayuda.</p>
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
</table>`
  try {
    if (isValidEmail(responseTicket[0].emailContacto)) {
      
      let email = {
        from: '"Mesa De Ayuda" </emailFrom.from>',  //remitente
        to: responseTicket[0].emailContacto,  //destinatario
        subject: "Ticket Respondido",  //asunto del correo
        html: plantilla
      };

      let createTransport = nodemailer.createTransport(jConfig);
      createTransport.sendMail(email, function (error, info) {
        if (error) {
          console.log("Error al enviar email a: ", responseTicket[0].emailContacto);
          console.log("Error: ", error);
        } else {
          console.log("Correo enviado correctamente a: ", responseTicket[0].emailContacto);
        }
        createTransport.close();
      });
    }
  } catch (error) {
    console.log(error);
  }
}





export { getTicketDetalleCtrl, addDetalleCtrl }