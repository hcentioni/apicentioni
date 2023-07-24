"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ticketCerrarCtrl = exports.takeTicketCtrl = exports.getTicketsCtrl = exports.finalizarTicketCtrl = exports.contadorTicketGetCtrl = exports.comentariosGetCtrl = exports.cancelarTicketCtrl = exports.cambiarEstadoTicketCtrl = exports.addTicketCtrl = exports.addComentarioTicketCtrl = void 0;
var _tickets = require("../services/tickets.service");
var nodemailer = _interopRequireWildcard(require("nodemailer"));
var _mails = require("../config/mails");
var _validar = require("../utils/validar");
var _tecnicos = require("../services/tecnicos.service");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//OBTENER UNO O TODOS LOS USUARIOS DE UN CLIENTE
var getTicketsCtrl = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var parametros, responseUsers;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          parametros = {
            IdTicket: null,
            IdCliente: null,
            FechaDesde: null,
            FechaHasta: null,
            ConAccion: null,
            EnProceso: null,
            IdContacto: null,
            IdUsuario: null,
            IdEstados: null
          };
          if (req.query.IdTicket) {
            parametros.IdTicket = parseInt(req.query.IdTicket);
          }
          ;
          if (req.query.IdCliente) {
            parametros.IdCliente = parseInt(req.query.IdCliente);
          }
          ;
          if (req.query.FechaDesde) {
            parametros.FechaDesde = req.query.FechaDesde;
          }
          ;
          if (req.query.FechaHasta) {
            parametros.FechaHasta = req.query.FechaHasta;
          }
          ;
          if (req.query.ConAccion) {
            parametros.ConAccion = parseInt(req.query.ConAccion);
          }
          ;
          if (req.query.EnProceso) {
            parametros.EnProceso = parseInt(req.query.EnProceso);
          }
          ;
          if (req.query.IdUsuario) {
            parametros.IdUsuario = parseInt(req.query.IdUsuario);
          }
          ;
          if (req.query.IdContacto) {
            parametros.IdContacto = parseInt(req.query.IdContacto);
          }
          ;
          if (req.query.IdEstados) {
            parametros.IdEstados = req.query.IdEstados;
          }
          ;
          _context.next = 21;
          return (0, _tickets.getTickets)(parametros);
        case 21:
          responseUsers = _context.sent;
          res.status(200);
          res.send(responseUsers);
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getTicketsCtrl(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//AGREGAR UNO TICKET
exports.getTicketsCtrl = getTicketsCtrl;
var addTicketCtrl = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body, IdCliente, Asunto, Mensaje, Archivo, AdjuntoNameOrg, Prioridad, IdCategoria, IdContacto, ticket, responseTicket;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          //CARGO LAS VARIABLES DEL BODY
          _req$body = req.body, IdCliente = _req$body.IdCliente, Asunto = _req$body.Asunto, Mensaje = _req$body.Mensaje, Archivo = _req$body.Archivo, AdjuntoNameOrg = _req$body.AdjuntoNameOrg, Prioridad = _req$body.Prioridad, IdCategoria = _req$body.IdCategoria, IdContacto = _req$body.IdContacto; //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
          ticket = {
            IdCliente: IdCliente,
            Asunto: Asunto,
            Mensaje: Mensaje,
            Archivo: Archivo,
            AdjuntoNameOrg: AdjuntoNameOrg,
            Prioridad: Prioridad,
            IdCategoria: IdCategoria,
            IdContacto: IdContacto
          }; //LLAMO AL SERVICIO
          _context2.next = 4;
          return (0, _tickets.addTicket)(ticket);
        case 4:
          responseTicket = _context2.sent;
          if (responseTicket === 'TICKET_NOT_ADD') {
            res.status(400);
            res.json(responseTicket);
          } else {
            //ENVIO LA NOTIFICACION POR MAIL
            enviarMailNotificacionNuevoTicket(responseTicket.recordset[0]);
            //ENVIO LOS MAILS A TECNICOS
            enviarMailNotificacionTecnciosNuevoTicket(responseTicket.recordset[0]);

            //RESPONDO LA SOLICITUD
            res.status(200);
            res.json(responseTicket);
          }
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function addTicketCtrl(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

//TOMAR UNO TICKET
exports.addTicketCtrl = addTicketCtrl;
var takeTicketCtrl = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body2, IdTicket, IdUsuario, ticket, responseTicket;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          //CARGO LAS VARIABLES DEL BODY
          _req$body2 = req.body, IdTicket = _req$body2.IdTicket, IdUsuario = _req$body2.IdUsuario; //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
          ticket = {
            IdTicket: IdTicket,
            IdUsuario: IdUsuario
          }; //LLAMO AL SERVICIO
          _context3.next = 4;
          return (0, _tickets.takeTicket)(ticket);
        case 4:
          responseTicket = _context3.sent;
          if (responseTicket === 'TICKET_NOT_TAKE') {
            res.status(400);
            res.json(responseTicket);
          } else {
            res.status(200);
            res.json(responseTicket);
          }
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function takeTicketCtrl(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

//CAMBIAR ESTADO DE UNO TICKET
exports.takeTicketCtrl = takeTicketCtrl;
var cambiarEstadoTicketCtrl = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body3, IdTicket, IdEstado, Prioridad, ticket, responseTicketUpdate;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          //CARGO LAS VARIABLES DEL BODY
          _req$body3 = req.body, IdTicket = _req$body3.IdTicket, IdEstado = _req$body3.IdEstado, Prioridad = _req$body3.Prioridad; //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
          ticket = {
            IdTicket: IdTicket,
            IdEstado: IdEstado,
            Prioridad: Prioridad
          }; //LLAMO AL SERVICIO
          _context4.next = 4;
          return (0, _tickets.cambiarEstadoTicket)(ticket);
        case 4:
          responseTicketUpdate = _context4.sent;
          if (responseTicketUpdate === 'TICKET_NOT_UPDATE') {
            res.status(400);
            res.json(responseTicketUpdate);
          } else {
            res.status(200);
            res.json(responseTicketUpdate);
          }
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function cambiarEstadoTicketCtrl(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

//CERRAR UN TICKET
exports.cambiarEstadoTicketCtrl = cambiarEstadoTicketCtrl;
var ticketCerrarCtrl = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body4, IdTicket, Solucion, ticket, responseTicketClosed;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          //CARGO LAS VARIABLES DEL BODY
          _req$body4 = req.body, IdTicket = _req$body4.IdTicket, Solucion = _req$body4.Solucion; //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
          ticket = {
            IdTicket: IdTicket,
            Solucion: Solucion
          }; //LLAMO AL SERVICIO
          _context5.next = 4;
          return (0, _tickets.ticketCerrar)(ticket);
        case 4:
          responseTicketClosed = _context5.sent;
          if (responseTicketClosed === 'TICKET_NOT_CLOSED') {
            res.status(400);
            res.json(responseTicketClosed);
          } else {
            res.status(200);
            res.json(responseTicketClosed);
          }
        case 6:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function ticketCerrarCtrl(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

//CREAR UN COMENTARIO DEL TICKET
exports.ticketCerrarCtrl = ticketCerrarCtrl;
var addComentarioTicketCtrl = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body5, IdTicket, IdUsuario, Comentario, comentario, responseComentario;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          //CARGO LAS VARIABLES DEL BODY
          _req$body5 = req.body, IdTicket = _req$body5.IdTicket, IdUsuario = _req$body5.IdUsuario, Comentario = _req$body5.Comentario; //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
          comentario = {
            IdTicket: IdTicket,
            IdUsuario: IdUsuario,
            Comentario: Comentario
          }; //LLAMO AL SERVICIO
          _context6.next = 4;
          return (0, _tickets.addComentarioTicket)(comentario);
        case 4:
          responseComentario = _context6.sent;
          if (responseComentario === 'TICKET_NOT_COMENTARIO') {
            res.status(400);
            res.json(responseComentario);
          } else {
            res.status(200);
            res.json(responseComentario);
          }
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function addComentarioTicketCtrl(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

//OBTENER LOS COMENTARIOS DEL TICKET
exports.addComentarioTicketCtrl = addComentarioTicketCtrl;
var comentariosGetCtrl = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var IdTicket, responseComentarios;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          IdTicket = req.params.id;
          _context7.next = 3;
          return (0, _tickets.getComentarios)(IdTicket);
        case 3:
          responseComentarios = _context7.sent;
          res.status(200);
          res.send(responseComentarios);
        case 6:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function comentariosGetCtrl(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

//CANCELAR UN TICKET TICKET
exports.comentariosGetCtrl = comentariosGetCtrl;
var cancelarTicketCtrl = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$body6, IdTicket, IdUsuarioCancela, Comentario, ticket, responseCancelar;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          //CARGO LAS VARIABLES DEL BODY
          _req$body6 = req.body, IdTicket = _req$body6.IdTicket, IdUsuarioCancela = _req$body6.IdUsuarioCancela, Comentario = _req$body6.Comentario; //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
          ticket = {
            IdTicket: IdTicket,
            IdUsuarioCancela: IdUsuarioCancela,
            Comentario: Comentario
          }; //LLAMO AL SERVICIO
          _context8.next = 4;
          return (0, _tickets.cancelarTicket)(ticket);
        case 4:
          responseCancelar = _context8.sent;
          if (responseCancelar === 'TICKET_IS_CANCELADO') {
            res.status(200);
            res.json(responseCancelar);
          } else {
            res.status(400);
            res.json(responseCancelar);
          }
        case 6:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function cancelarTicketCtrl(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

//FINALIZAR UN TICKET TICKET
exports.cancelarTicketCtrl = cancelarTicketCtrl;
var finalizarTicketCtrl = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$body7, IdTicket, IdUsuarioFinaliza, Solucion, ticket, responseFinalizado;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          //CARGO LAS VARIABLES DEL BODY
          _req$body7 = req.body, IdTicket = _req$body7.IdTicket, IdUsuarioFinaliza = _req$body7.IdUsuarioFinaliza, Solucion = _req$body7.Solucion; //PREPARO EL OBJETO PARA ENVIAR AL SERVICIO
          ticket = {
            IdTicket: IdTicket,
            IdUsuarioFinaliza: IdUsuarioFinaliza,
            Solucion: Solucion
          }; //LLAMO AL SERVICIO
          _context9.next = 4;
          return (0, _tickets.finalizarTicket)(ticket);
        case 4:
          responseFinalizado = _context9.sent;
          if (responseFinalizado === 'TICKET_IS_FINALIZADO') {
            res.status(200);
            res.json(responseFinalizado);
          } else {
            res.status(400);
            res.json(responseFinalizado);
          }
        case 6:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function finalizarTicketCtrl(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

//OBTENER LOS CONTADORES DE TICKET
exports.finalizarTicketCtrl = finalizarTicketCtrl;
var contadorTicketGetCtrl = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var responseContador;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _tickets.contadorTickets)();
        case 2:
          responseContador = _context10.sent;
          res.status(200);
          res.send(responseContador);
        case 5:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function contadorTicketGetCtrl(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

//NOTIFICACIONES 

//NUEVO TICKET
exports.contadorTicketGetCtrl = contadorTicketGetCtrl;
function enviarMailNotificacionNuevoTicket(ticket) {
  //console.log('Llega', ticket)
  try {
    //ENVIO DE MAILS
    var email = {
      from: '"Mesa De Ayuda" </emailFrom.from>',
      //remitente
      to: ticket.emailContacto,
      //destinatario
      subject: "Nuevo Ticket Generado",
      //asunto del correo,
      bcc: "soporte@centioni.com.ar",
      html: " \n      <table border=\"0\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td align=\"center\" valign=\"top\">\n<table border=\"0\" width=\"590\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td align=\"left\" valign=\"middle\">\n<table border=\"0\" width=\"150\" cellspacing=\"0\" cellpadding=\"0\" align=\"left\">\n<tbody>\n<tr>\n<td align=\"right\" valign=\"middle\">\n<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"left\">\n<tbody>\n<tr>\n<td align=\"center\" valign=\"middle\" width=\"auto\" height=\"37\"><a title=\"Centioni Servicios Inform&aacute;ticos SRL\" href=\"https://www.centioni.com.ar\" target=\"_blank\" rel=\"noopener\" data-saferedirecturl=\"https://www.google.com/url?q=https://donweb.com&amp;source=gmail&amp;ust=1679664332081000&amp;usg=AOvVaw1E1AxAx2hDwuARKJju12JM\">Centioni</a></td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n<td align=\"right\" valign=\"middle\">\n<p><strong>Tu n&uacute;mero de ticket es: ".concat(ticket.IdTicket, "</strong><br />&nbsp;&nbsp;<a title=\"Mesa de Ayuda\" href=\"https://soporte.centioni.com.ar/\" target=\"_blank\" rel=\"noopener\" data-saferedirecturl=\"https://www.google.com/url?q=https://micuenta.donweb.com/soporte/ayuda?utm_source%3Demail-sistema%26utm_medium%3Demail-sistema%26utm_campaign%3D&amp;source=gmail&amp;ust=1679664332081000&amp;usg=AOvVaw09VPg8k_duZo-VZpMiPPEb\">Mesa de Ayuda</a></p>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n<tr>\n<td align=\"left\" valign=\"top\" height=\"10\">&nbsp;</td>\n</tr>\n<tr>\n<td>\n<table border=\"0\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td colspan=\"2\" align=\"left\" valign=\"top\" bgcolor=\"#22AAE4\" height=\"10\">&nbsp;</td>\n<td align=\"right\" valign=\"top\" bgcolor=\"#22AAE4\" width=\"10\" height=\"10\">&nbsp;</td>\n</tr>\n<tr>\n<td align=\"left\" valign=\"top\" bgcolor=\"#22AAE4\" width=\"10\" height=\"20\">&nbsp;</td>\n<td align=\"left\" valign=\"middle\" bgcolor=\"#22AAE4\">&nbsp;Estado de tu consulta</td>\n<td align=\"right\" valign=\"top\" bgcolor=\"#22AAE4\" width=\"10\">&nbsp;</td>\n</tr>\n<tr>\n<td colspan=\"3\" align=\"left\" valign=\"top\" bgcolor=\"#22AAE4\" height=\"10\">&nbsp;</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n<tr>\n<td bgcolor=\"#FFFFFF\" height=\"20\">&nbsp;</td>\n</tr>\n<tr>\n<td align=\"center\" valign=\"top\" bgcolor=\"#FFFFFF\">\n<table border=\"0\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td width=\"30\">&nbsp;</td>\n<td align=\"left\" valign=\"top\">\n<h2>").concat(ticket.contactoApellido, " ").concat(ticket.contactoNombre, ",</h2>\n<p>Simplemente quiero informarte que ya hemos recibido tu consulta y nos encontramos trabajando en ella para darte una r&aacute;pida respuesta, acorde a tu necesidad. Te pido por favor aguardes la misma. Muchas gracias por contactarte.</p>\n<pre>Quedo a tu disposici&oacute;n y te agradezco califiques mi respuesta porque nos ayudar&aacute; a mejorar la calidad de atenci&oacute;n.\n\n------------------------------<wbr />------------------------------<wbr />--------\n\nEquipo de soporte - Centioni Servicios Inform\xE1ticos S.R.L\n------------------------------<wbr />------------------------------<wbr />--------</pre>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n      \n  ")
    };
    //

    var createTransport = nodemailer.createTransport(_mails.jConfig);

    //

    createTransport.sendMail(email, function (error, info) {
      if (error) {
        console.log("Error al enviar email", error);
      } else {
        console.log("Correo enviado correctamente");
      }
      createTransport.close();
    });
  } catch (error) {
    console.log(error);
  }
}

//OBTENER UNO O TODOS LOS USUARIOS DE UN CLIENTE
var enviarMailNotificacionTecnciosNuevoTicket = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(ticket) {
    var responseTecnicos, plantilla;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return (0, _tecnicos.tecnicosGet)(null, 1);
        case 2:
          responseTecnicos = _context11.sent;
          plantilla = "<p>\n  <table border=\"0\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n  <tbody>\n  <tr>\n  <td align=\"center\" valign=\"top\">\n  <table border=\"0\" width=\"590\" cellspacing=\"0\" cellpadding=\"0\">\n  <tbody>\n  <tr>\n  <td align=\"left\" valign=\"middle\">\n  <table border=\"0\" width=\"150\" cellspacing=\"0\" cellpadding=\"0\" align=\"left\">\n  <tbody>\n  <tr>\n  <td align=\"right\" valign=\"middle\">\n  <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"left\">\n  <tbody>\n  <tr>\n  <td align=\"center\" valign=\"middle\" width=\"auto\" height=\"37\"><a title=\"Centioni Servicios Inform&aacute;ticos SRL\" href=\"https://www.centioni.com.ar\" target=\"_blank\" rel=\"noopener\" data-saferedirecturl=\"https://www.google.com/url?q=https://donweb.com&amp;source=gmail&amp;ust=1679664332081000&amp;usg=AOvVaw1E1AxAx2hDwuARKJju12JM\">Centioni</a></td>\n  </tr>\n  </tbody>\n  </table>\n  </td>\n  </tr>\n  </tbody>\n  </table>\n  </td>\n  <td align=\"right\" valign=\"middle\">\n  <p><strong>Tu n&uacute;mero de ticket es: ".concat(ticket.IdTicket, "</strong><br />&nbsp;&nbsp;<a title=\"Mesa de Ayuda\" href=\"https://soporte.centioni.com.ar/\" target=\"_blank\" rel=\"noopener\" data-saferedirecturl=\"https://www.google.com/url?q=https://micuenta.donweb.com/soporte/ayuda?utm_source%3Demail-sistema%26utm_medium%3Demail-sistema%26utm_campaign%3D&amp;source=gmail&amp;ust=1679664332081000&amp;usg=AOvVaw09VPg8k_duZo-VZpMiPPEb\">Mesa de Ayuda</a></p>\n  </td>\n  </tr>\n  </tbody>\n  </table>\n  </td>\n  </tr>\n  <tr>\n  <td align=\"left\" valign=\"top\" height=\"10\">&nbsp;</td>\n  </tr>\n  <tr>\n  <td>\n  <table border=\"0\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\">\n  <tbody>\n  <tr>\n  <td colspan=\"2\" align=\"left\" valign=\"top\" bgcolor=\"#22AAE4\" height=\"10\">&nbsp;</td>\n  <td align=\"right\" valign=\"top\" bgcolor=\"#22AAE4\" width=\"10\" height=\"10\">&nbsp;</td>\n  </tr>\n  <tr>\n  <td align=\"left\" valign=\"top\" bgcolor=\"#22AAE4\" width=\"10\" height=\"20\">&nbsp;</td>\n  <td align=\"left\" valign=\"middle\" bgcolor=\"#22AAE4\">SE GENERO UN NUEVO TICKET</td>\n  <td align=\"right\" valign=\"top\" bgcolor=\"#22AAE4\" width=\"10\">&nbsp;</td>\n  </tr>\n  <tr>\n  <td colspan=\"3\" align=\"left\" valign=\"top\" bgcolor=\"#22AAE4\" height=\"10\">&nbsp;</td>\n  </tr>\n  </tbody>\n  </table>\n  </td>\n  </tr>\n  <tr>\n  <td bgcolor=\"#FFFFFF\" height=\"20\">&nbsp;</td>\n  </tr>\n  <tr>\n  <td align=\"center\" valign=\"top\" bgcolor=\"#FFFFFF\">\n  <table border=\"0\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\">\n  <tbody>\n  <tr>\n  <td style=\"width: 0px;\">&nbsp;</td>\n  <td style=\"width: 877.5px;\" align=\"left\" valign=\"top\">\n  <h2>").concat(ticket.RazonSocial, "</h2>\n  <h2>").concat(ticket.contactoApellido, " ").concat(ticket.contactoNombre, ",</h2>\n  <p>Se genero un nuevo ticket Nro:").concat(ticket.IdTicket, "</p>\n  <p>Prioridad: ").concat(ticket.Prioridad, "</p>\n  <p>Categoria: ").concat(ticket.Categoria, "</p>\n  <p>Asunto: ").concat(ticket.Asunto, "</p>\n  <p>Falla: ").concat(ticket.Mensaje, "</p>\n  </td>\n  </tr>\n  </tbody>\n  </table>\n  </td>\n  </tr>\n  </tbody>\n  </table>");
          try {
            responseTecnicos.recordset.forEach(function (element) {
              if ((0, _validar.isValidEmail)(element.email)) {
                //console.log('Enviado a: ',element.email)
                //POR CADA TECNICO ACTIVO LE ENVIO UN MENSAJE
                var email = {
                  from: _mails.emailFrom.from,
                  //remitente
                  to: element.email,
                  //destinatario
                  subject: "Nuevo Ticket Generado",
                  //asunto del correo
                  html: plantilla
                };
                var createTransport = nodemailer.createTransport(_mails.jConfig);
                createTransport.sendMail(email, function (error, info) {
                  if (error) {
                    console.log("Error al enviar email a: ", element.email);
                  } else {
                    console.log("Correo enviado correctamente a: ", element.email);
                  }
                  createTransport.close();
                });
              }
            });
          } catch (error) {
            console.log(error);
          }
        case 5:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function enviarMailNotificacionTecnciosNuevoTicket(_x21) {
    return _ref11.apply(this, arguments);
  };
}();

//EXPORTO LAS FUNCIONES