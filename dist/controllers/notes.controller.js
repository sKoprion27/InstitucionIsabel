"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNotes = void 0;

var getNotes = function getNotes(req, res) {
  res.status(200).json({
    message: 'GET notes'
  });
};

exports.getNotes = getNotes;