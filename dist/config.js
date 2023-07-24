"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var _default = {
  port: process.env.PORT,
  secret: process.env.SECRETO,
  dbuser: process.env.DBuser,
  dbpass: process.env.DBpass,
  dbcatalogo: process.env.dbcatalogo,
  dbserver: process.env.DBserver,
  dbport: process.env.DBport,
  DBencrypt: process.env.DBencrypt,
  DBtrustServerCertificate: process.env.DBtrustServerCertificate
};
exports["default"] = _default;