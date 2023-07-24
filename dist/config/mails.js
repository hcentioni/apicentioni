"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jConfig = exports.emailFrom = void 0;
var jConfig = {
  "host": "mail.centioni.com.ar",
  "port": "25",
  "secure": false,
  "auth": {
    "type": "no-reply@centioni.com.ar",
    "user": "no-reply@centioni.com.ar",
    "pass": "Sh*5vErE"
  },
  tls: {
    rejectUnauthorized: false
  }
};
exports.jConfig = jConfig;
var emailFrom = {
  "from": "no-reply@centioni.com.ar"
};
exports.emailFrom = emailFrom;