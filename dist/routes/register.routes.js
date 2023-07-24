"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _register = require("../controllers/register.controllers");
var router = (0, _express.Router)();

//VERIFICO SI EXISTE EL LOGIN
router.get('/register/exist/:id', _register.existUserCtrl);

//AGREGO UN NUEVO USUARIO
router.post('/register/', _register.addUserCtrl);
var _default = router;
exports["default"] = _default;