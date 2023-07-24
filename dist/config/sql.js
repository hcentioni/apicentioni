"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCn = createCn;
exports.sqlConfig = void 0;
require("dotenv/config");
var _mssql = _interopRequireDefault(require("mssql"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var sqlConfig = {
  user: process.env.DBuser || '',
  password: process.env.DBpass || '',
  database: process.env.DBcatalogo || '',
  server: process.env.DBserver || '',
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};
exports.sqlConfig = sqlConfig;
function createCn() {
  var con = _mssql["default"].connect(sqlConfig);
  return con;
}