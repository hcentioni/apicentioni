const webpush = require('web-push')
import {getTickets,addTicket} from '../services/tickets.service'


const vapidKeys = {
  "publicKey": "BLfXeX92klLO6YPUK8Dpm46Xro23lHinctBo9muWcLT1Hvu6tMb7EYQZays8axNb2cdnHHqbjLLd6p1zyLgVXAU",
  "privateKey": "S9W5lHsmAG_ofqbwVu8PZRhzCVcdn6ZUsP5-sY1pp1I"
}


webpush.setVapidDetails(
  'mailto:info@centioni.com.ar',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);



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


    const pushSubscription = {
      endpoint: 'https://fcm.googleapis.com/fcm/send/eZpI3slzOW4:APA91bFRUeXT5xkwr3MDQiGS3XlUSSAMojFv71dwfeHPhIyt0W4APcIllSTFfrFiCMBVkjmEu_Sc1WtWUbSFQjKCADae4P7g6D8gHVpsJA_lramwmBOPX3woyOIw2By5fVPNETMmY-OE',
      keys: {
          auth: 'qAnXnP6Ued48LDdKon9e0A',
          p256dh: 'BIdVnfWzayTmjWYry96MQBtIelUx8hp9p3e4n9MwE7YvsqaSulscNABnhW4mwMboKSqjhcr0GTKzvlSFri7mgKc'
      }
  }


  const payload = {
      "notification": {
          "title": "Saludos",
          "body": ticket.Mensaje,
          "vibrate": [100, 50, 10],
          "image": "",
          "data": {
              "dateOfArrival": Date.now(),
              "primaryKey": 1
          },
          "actions": [{
              "action": "explore",
              "title": "Go to the site"
          }]
      }
  }

  webpush.sendNotification(
      pushSubscription,
      JSON.stringify(payload)).then(res => {
          console.log('Enviado');
      }).catch(err => {
          console.log('Error')
      })



    res.status(200);
    res.json(responseTicket);
    

  }

}

  export {getTicketsCtrl,addTicketCtrl}
  