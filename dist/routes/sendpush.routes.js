"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var webpush = require('web-push');
var router = (0, _express.Router)();
var vapidKeys = {
  "publicKey": "BLfXeX92klLO6YPUK8Dpm46Xro23lHinctBo9muWcLT1Hvu6tMb7EYQZays8axNb2cdnHHqbjLLd6p1zyLgVXAU",
  "privateKey": "S9W5lHsmAG_ofqbwVu8PZRhzCVcdn6ZUsP5-sY1pp1I"
};
webpush.setVapidDetails('mailto:info@centioni.com.ar', vapidKeys.publicKey, vapidKeys.privateKey);

//OBTENER TODOS LOS USUARIOS
router.post('/pwa/sendpush', function (req, res) {
  console.log('Llego a la ruta');
  var pushSubscription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/eZpI3slzOW4:APA91bFRUeXT5xkwr3MDQiGS3XlUSSAMojFv71dwfeHPhIyt0W4APcIllSTFfrFiCMBVkjmEu_Sc1WtWUbSFQjKCADae4P7g6D8gHVpsJA_lramwmBOPX3woyOIw2By5fVPNETMmY-OE',
    keys: {
      auth: 'qAnXnP6Ued48LDdKon9e0A',
      p256dh: 'BIdVnfWzayTmjWYry96MQBtIelUx8hp9p3e4n9MwE7YvsqaSulscNABnhW4mwMboKSqjhcr0GTKzvlSFri7mgKc'
    }
  };
  var payload = {
    "notification": {
      "title": "Saludos",
      "body": "Cuerpo del mensaje",
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
  };
  webpush.sendNotification(pushSubscription, JSON.stringify(payload)).then(function (res) {
    console.log('Enviado');
  })["catch"](function (err) {
    console.log('Error');
  });
  res.send('ok');
});
var _default = router;
exports["default"] = _default;