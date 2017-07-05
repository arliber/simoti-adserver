'use strict';

const cors = require('cors');
const snippetServer = require('./functions/snippetServer');
const snippetCompiler = require('./functions/snippetCompiler');
const logger = require('./functions/logger');

module.exports.tagLogger = (req, res) => {
  var corsFn = cors();
  corsFn(req, res, function() {
    logger.tagLogger(req);
    res.status(200).send({});
  });
};

module.exports.getSnippet = (req, res) => {
  var corsFn = cors();
  corsFn(req, res, function() {
    if(!req.headers.referer) {
      console.error('getSnippet: Unknown referer in request');
      res.status(200).send({error:'no referer'});
    } else {
      snippetServer.getSnippet(req.headers.referer).then((snippet) => {
        res.status(200).send(snippet);
      }).catch((err) => {
        res.status(210).send(err);
      });
    }
  });
};

module.exports.applySnippet = (req, res) => {
  var corsFn = cors();
  corsFn(req, res, function() {
    if(!req.body.snippetId || !req.body.publisherId || !req.body.articleId) {
      console.error('applySnippet: snippet or article keys are missing');
      res.status(404).send({error:'missing snippet or article keys'});
    } else {
      snippetCompiler.applySnippet(req.body.snippetId, req.body.publisherId, req.body.articleId).then((result) => {
        res.status(200).send(result);
      }).catch((err) => {
        res.status(500).send(err);
      });
    }
  });
};

exports.event = (event, callback) => {
  callback();
};
