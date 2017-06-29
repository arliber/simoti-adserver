'use strict';

const snippetServer = require('./snippetServer');
const cors = require('cors');

module.exports.tagLogger = (req, res) => {
  var corsFn = cors();
  corsFn(req, res, function() {
    console.log(`Source: ${req.headers.referer?req.headers.referer:'unknown'}`, req.body);
    res.status(200).send({});
  });
};

module.exports.getSnippet = (req, res) => {
  var corsFn = cors();
  corsFn(req, res, function() {
    if(req.headers.referer) {
      snippetServer.getSnippet(req.headers.referer).then((snippet) => {
        res.status(200).send(snippet);
      }).catch((err) => {
        res.status(210).send(err);
      });
    } else {
      console.error('getSnippet: Unknown referer in request');
      res.status(200).send({error:'no referer'});
    }
  });
};

exports.event = (event, callback) => {
  callback();
};
