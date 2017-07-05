'use strict';

global.__base = __dirname + '/';

let datastore = require('@google-cloud/datastore')({
  projectId: 'simoti-171512',
  keyFilename: __base + 'keyfile.json'
});

function getSnippetById(snippetId) {
  let key = datastore.key(['snippets', snippetId]);
  return datastore.get(key).then((snippets) => {
    if(!snippets[0]) {
      console.error(`getSnippetById: Unable to find snippet id [${snippetId}]`);
      return null;
    } else {
      return snippets[0];
    }
  }).catch((e) => {
    console.error(`getSnippetById: Error in searching for snippet with key [${snippetId}]`, e);
  });
}

function getArticleById(publisherId, articleId) {
  let key = datastore.key(['publishers', publisherId, 'articles', articleId]);
  return datastore.get(key).then((articles) => {
    if(!articles[0]) {
      console.error(`getArticleById: Unable to find article id [${articleId}] for publisher id [${publisherId}]`);
      return null;
    } else {
      return articles[0];
    }
  }).catch((e) => {
    console.error(`getArticleById: Error in searching for article id [${articleId}] for publisher id [${publisherId}]`, err);
  });
}

function getPublisherById(publisherId) {
  let key = datastore.key(['publishers', publisherId]);
  return datastore.get(key).then((publishers) => {
    if(!publishers[0]) {
      console.error(`getPublisherByDomain: Publisher [${publisherId}] was not found`);
      return null;    
    } else {
      return publishers[0];
    }
  }).catch((err) => {
    console.error(`getPublisherByDomain: Searching for publisher [${publisherId}] errored`, err);
    return null;
  });
}

/* Export */
module.exports = {
  getSnippetById,
  getArticleById,
  getPublisherById
};