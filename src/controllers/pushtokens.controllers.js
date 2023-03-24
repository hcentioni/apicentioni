import { addToken, getTokens } from '../services/pushtokens.service'
import { pwaConfig } from '../config/pwa';

const webpush = require('web-push')

const vapidKeys = {
  "publicKey": pwaConfig.publicKey,
  "privateKey": pwaConfig.privateKey
}

webpush.setVapidDetails(
  'mailto:info@centioni.com.ar',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);


//AGREGAR UNO USUARIO
const addTokenCtrl = async (req, res) => {

    //CARGO LAS VARIABLES DEL BODY
    const { IdAsociado, IdContacto, IdUsuario, IdTecnico, endpoint, auth, p256dh } = req.body;

    //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
    const token = {
        IdAsociado,
        IdContacto,
        IdUsuario,
        IdTecnico,
        endpoint,
        auth,
        p256dh
    }

    //LLAMO AL SERVICIO
    const responseTokens = await addToken(token);
    if (responseTokens === 'TOKEN_NOT_ADD') {
        res.status(400);
        res.send(responseTokens);
    } else {
        res.status(200);
        res.json(responseTokens);
    }

}
//OBTENER UNO O TODOS LOS TOKENS
const getTokensCtrl = async (req, res) => {

    const parametros = {
        IdAsociado: null,
        IdContacto: null,
        IdUsuario: null,
        IdTecnico: null,
        Asociados: null,
        Contactos: null,
        Usuario: null,
        Tecnicos: null
    }
    
    if (req.query.IdAsociado) {
        parametros.IdAsociado = parseInt(req.query.IdTIdAsociadoicket);
      };

      if (req.query.IdContacto) {
        parametros.IdContacto = parseInt(req.query.IdContacto);
      };

      if (req.query.IdUsuario) {
        parametros.IdUsuario = parseInt(req.query.IdUsuario);
      };

      if (req.query.IdTecnico) {
        parametros.IdTecnico = parseInt(req.query.IdTecnico);
      };

      if (req.query.Asociados) {
        parametros.Asociados = parseInt(req.query.Asociados);
      };
      if (req.query.Contactos) {
        parametros.Contactos = parseInt(req.query.Contactos);
      };
      if (req.query.Usuario) {
        parametros.Usuario = parseInt(req.query.Usuario);
      };
      if (req.query.Tecnicos) {
        parametros.Tecnicos = parseInt(req.query.Tecnicos);
      };


    const responseTokens = await getTokens(parametros);

    //recorro los tokens enviando la notificacion de un nuevo tickets
    responseTokens.forEach(element => {
      const pushSubscription = {
        endpoint: element.endpoint,
        keys: {
            auth: element.auth,
            p256dh: element.p256dh
        }
    }
  
    const payload = {
        "notification": {
            "title": "Nuevo Ticket",
            "body": req.query.mensaje,
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
  
    });
  
    res.status(200);
    res.send(responseTokens);


  }

export { addTokenCtrl, getTokensCtrl }