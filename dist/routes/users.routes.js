"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _users = require("../controllers/users.controllers");
var router = (0, _express.Router)();

//OBTENER TODOS LOS USUARIOS
router.get('/auth/users/search?', _users.getUsersCtrl);

//VERIFICO SI EXISTE EL LOGIN
router.get('/auth/users/exist/:id', _users.existUserCtrl);

//AGREGO UN NUEVO USUARIO
router.post('/auth/users', _users.addUserCtrl);

//EDITO UN USUARIO
router.put('/auth/users/:id', _users.editUserCtrl);

//ELIMINO UN USUARIO
router["delete"]('/auth/users/:id', _users.deleteUserCtrl);
var _default = router;
exports["default"] = _default;