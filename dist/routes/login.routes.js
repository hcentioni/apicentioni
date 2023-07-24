"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _auth = require("../controllers/auth.controllers");
var router = (0, _express.Router)();
router.post('/login', _auth.loginCtrl);
router.post('/operador/login', _auth.loginOperadoresCtrl);
var _default = router;
exports["default"] = _default;