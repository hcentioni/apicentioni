"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
var filesystem = _fs["default"].promises;
//GUARDO UN TOKEN PUSH
router.post('/save', function (req, res) {
  //PROCESO LOCALEMNTE DESPUES DESARMAR

  var name = Math.floor(Date.now() / 1000);
  console.log('Body es: ', req.body);
  var tokenBrowser = req.body;
  var data = JSON.stringify(tokenBrowser);

  // filesystem.writeFile(`./tokens/token-${name}.json`, data,calback(err | null) => {
  //     if (err) throw err;

  _fs["default"].writeFile("./tokens/token-".concat(name, ".json"), data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
});
var _default = router;
exports["default"] = _default;