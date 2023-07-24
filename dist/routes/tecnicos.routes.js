"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tecnicos = require("../controllers/tecnicos.controllers");
var router = (0, _express.Router)();

//OBTENER TODOS LOS TECNICOS
router.get('/auth/tecnicos/search?', _tecnicos.tecnicosGetCtrl);
var _default = router;
exports["default"] = _default;