"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _pushtokens = require("../controllers/pushtokens.controllers");
var router = (0, _express.Router)();

//GUARDO UN TOKEN PUSH
router.post('/auth/token', _pushtokens.addTokenCtrl);

//NOTIFICACION NUEVO TICKET
router.get('/auth/token/newticket/search?', _pushtokens.getTokensCtrl);
var _default = router;
exports["default"] = _default;