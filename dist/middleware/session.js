"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkJwt = void 0;
var _jwt = require("../utils/jwt.handle");
var checkJwt = function checkJwt(req, res, next) {
  try {
    var jwtByUser = req.headers.authorization;
    var jwt = jwtByUser.split(" ")[1];
    var isUser = (0, _jwt.verifyToken)("".concat(jwt));
    if (!isUser) {
      res.status(401);
      res.send('NO_TIENES _SESION_VALIDA');
    } else {
      req.user = isUser;
      next();
    }
  } catch (error) {
    res.status(400);
    res.json('SESSION_INVALID');
  }
};
exports.checkJwt = checkJwt;