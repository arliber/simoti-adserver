var datastore = require('@google-cloud/datastore')({
  projectId: 'simoti-171512',
  keyFilename: './keyfile.json'
});

function getPublisherDomain(url) {
  const regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?(?:m\.)?([^:\/\n]+)/ig;
  //                                                       ^_____^ Ignore m. prefix for mobiles sites
  let groups = regex.exec(url);
  if(!groups || groups.length < 2) {
    console.error(`getPublisherDomain: Unable to extract publisher doamin from [${url}]`);
    return null;
  } else {
    return groups[1];
  }
}

function getPublisherByDomain(publisherDomain) {
  let key = datastore.key(['publishers', publisherDomain]);
  return datastore.get(key).then((publishers) => {
    if(!publishers[0]) {
      console.error(`getPublisherByDomain: Publisher [${publisherDomain}] was not found`);
      return null;    
    } else {
      return publishers[0];
    }
  }).catch((err) => {
    console.error(`getPublisherByDomain: Searching for publisher [${publisherDomain}] errored`, err);
    return null;
  });
}

function getArtcileId(url, articleIdRegex) {
  const regex = new RegExp(articleIdRegex, 'ig');
  let groups = regex.exec(url);
  if(!groups || groups.length < 2) {
    console.error(`getArtcileId: Unable to extract article id from [${url}] using regex [${articleIdRegex}]`);
    return null;
  } else {
    return groups[1];
  }
}

function isArticleValid(article) {
  const isValid = (article.status === 'assigned' && article.snippetProperties && article.snippetProperties.status === 'active' && article.snippetHTML);
  if(!isValid) {
    console.log(`isArticleValid: Invalid article`, article);
  }
  return isValid;
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

function saveNewArticle(publisherId, articleId, articleUrl) {
  const key = datastore.key(['publishers', publisherId, 'articles', articleId]);
  const entity = {
      key,
      data: {
        status: 'pending',
        url: articleUrl
      }
  };
  return datastore.save(entity);
}

function getOrCreateArticle(publisherId, articleId, articleUrl) {
  return new Promise((resolve, reject) => {
    let transaction = datastore.transaction();
    transaction.run(function(err) {
      if (err) {
        console.error(`getOrCreateArticle: Unable to create transaction while processing article [${articleUrl}]`);
        reject({error: 'unable to create transaction'});
      } else {
        getArticleById(publisherId, articleId).then((article) => {
          if(article) { // Exists - return 
            if(isArticleValid(article)) {
              const snippet = Object.assign({}, article.snippetProperties, { html: article.snippetHTML })
              resolve(snippet);
            } else {
              resolve({});
            }
          } else { // Doesn't exist - create
            saveNewArticle(publisherId, articleId, articleUrl).then((err) => {
              transaction.commit().catch((err) => {
                console.error(`getOrCreateArticle: Unable to commit after successful article save`);
              });
              resolve({});
            }).catch((err) => {
              transaction.commit().catch((err) => {
                console.error(`getOrCreateArticle: Unable to commit after failed article save`);
              });
              console.error(`Unable to to save new article for url [${articleUrl}]`, err);
              reject({error: `unable to create new article with id [${articleId}]`});
            }); 
          }
        });
      }// Else
    }); //Transaction
  }); // Promise
} // EOF

exports.getSnippet = (url) => {
  
  console.time('getSnippet');
  console.log(`getSnippet: Starting working on url [${url}]`);

  return new Promise((s, e) => {
    // resolve/reject helpers
    resolve = (val) => { console.timeEnd('getSnippet'); s(val); };
    reject = (val) => { console.timeEnd('getSnippet'); e(val); };

    const publisherDomain = getPublisherDomain(url);
    console.log(`getSnippet: Publisher domain [${publisherDomain}]`);
    
    if(!publisherDomain) {
      reject({error: 'publisher not found'});
    } else {
      getPublisherByDomain(publisherDomain)
      .then((publisher) => {
        if(!publisher) {
          reject({error: `publisher [${publisherDomain}] does not exist`});
        } else {
          let articleId = getArtcileId(url, publisher.articleIdRegex);
          console.log(`getSnippet: Processing artilce id [${articleId}] from [${publisherDomain}]`);

          if(!articleId) {
            reject({error: `unable to get article id from [${url}]`});
          } else {
            getOrCreateArticle(publisherDomain, articleId, url).then(resolve).catch(reject);
          }
        }
      });
    }
     
  });

};
