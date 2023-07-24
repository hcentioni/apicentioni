"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidEmail = isValidEmail;
function isValidEmail(mail) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail);
}