'use strict';

global.__base = __dirname + '/';

let datastore = require('@google-cloud/datastore')({
  projectId: 'simoti-171512',
  keyFilename: __base + '../keyfile.json'
});
let datastoreModel = require(__base + '../datastore.model');
let articleModel = require(__base + '../models/article.model.js');
let mustache = require('mustache');

exports.applySnippet = (snippetId, publisherId, articleId) => {
  console.log(`snippetCompiler - applySnippet: Working on snippet [${snippetId}] for publisher [${publisherId}] and article [${articleId}]`);
  return Promise.all([
          datastoreModel.getSnippetById(snippetId), 
          datastoreModel.getArticleById(publisherId, articleId),
          datastoreModel.getPublisherById(publisherId)
        ])
        .then((resolvedValues) => {
          let [snippet, article, publisher] = resolvedValues;
          if(!snippet || !article || !publisher) {
            console.error(`applySnippet: snippet id ${snippetId} - ${snippet?'FOUND':'NOT FOUND'}, article id ${articleId} for publisher ${publisherId} - ${article?'FOUND':'NOT FOUND'}, publisher ${publisherId} - ${publisher?'FOUND':'NOT FOUND'}`, 
                          snippet, article, publisher);
          } else {
            const snippetContent = compileSnippet(publisher, snippet);
            if (snippetContent) {
              return saveArticleSnippet(article, snippetId, snippetContent);
            }
          }
        })
        .catch((err) => {
          console.error(`applySnippet: Unable to resolve all required entities`, err);
          return err;
        });
};

function compileSnippet(publisher, snippet) {
  let templateField = `template_${snippet.template ? snippet.template : 'default'}`;
  let template = publisher[templateField];
  if (!template) {
    console.error(`snippetCompiler - compileSnippet: Unable to find tempalte [${templateField}] for publisher [${publisher[datastore.KEY].name}]`)
    return false;
  } else {
    return mustache.render(template, snippet);
  }
}

function saveArticleSnippet(article, snippetId, snippetContent) {
  article.snippetHTML = snippetContent;
  article.status = 'assigned';
  article.snippetId = article.snippetId ? article.snippetId : []; // Some article might not have snippetId property
  article.snippetId.push(snippetId)

  return datastore.save({
    key: article[datastore.KEY],
    data: articleModel(article)
  }).catch((err) => {
    console.error(`saveArticleSnippet: Unable to save snippet html for article`, article[datastore.KEY], err);
  });
}
