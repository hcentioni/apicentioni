"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _ordenTaller = require("../controllers/ordenTaller.controllers");
var router = (0, _express.Router)();

//OBTENER UNA ORDEN
router.get('/ordentaller/:id', _ordenTaller.ordenTallerGetCtrl);

//consulta post web
router.post('/ordentaller/web/', _ordenTaller.ordenTallerConsultaWebGetCtrl);
var _default = router;
exports["default"] = _default;