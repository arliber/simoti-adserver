var datastore = require('@google-cloud/datastore')({
  projectId: 'simoti-171512',
  keyFilename: './keyfile.json'
});

function getPublisherDomain(url) {
  const regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/ig;
  let groups = regex.exec(url);
  if(!groups || groups.length < 2) {
    return null;
  } else {
    return groups[1];
  }
}

function getPublisherByDomain(publisherDomain, cb) {
  let key = datastore.key(['publishers', publisherDomain]);
  return datastore.get(key);
}

function getArtcileId(url, articleIdRegex) {
  const regex = new RegExp(articleIdRegex, 'ig');
  let groups = regex.exec(url);
  if(!groups || groups.length < 2) {
    return null;
  } else {
    return groups[1];
  }
}

function getArticleById(publisherId, articleId) {
  let key = datastore.key(['publishers', publisherId, 'articles', articleId]);
  return datastore.get(key);
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
        console.error(`getOrCreateArticle: Unable to create transaction while processing article [${articleId}]`);
        reject({error: 'unable to create transaction'});
      } else {
        // Search for article
        getArticleById(publisherId, articleId).then((articles) => {
          if(articles && articles[0]) { // Exists - return 
            if(articles[0].status === 'assigned' && articles[0].snippetProperties && articles[0].snippetProperties.status === 'active' && articles[0].snippetHTML ) {
              const snippet = Object.assign({}, articles[0].snippetProperties, { html: articles[0].snippetHTML })
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

  return new Promise((resolve, reject) => {
    // Get publisher domain
    const publisherDomain = getPublisherDomain(url);
    if(!publisherDomain) {
      console.error(`getSnippet: Unable to extract publisher name from [${url}]`);
      resolve({error: 'publisher not found'});
    } else {
      // Get publisher entiy
      getPublisherByDomain(publisherDomain)
      .then((publisher) => {
        if(!publisher[0]) {
          console.time('getSnippet');
          console.error(`getSnippet: Publisher [${publisherDomain}] was not found`);
          reject({error: `publisher [${publisherDomain}] does not exist`})
        } else {
          // Extract article id
          let articleId = getArtcileId(url, publisher[0].articleIdRegex);
          getOrCreateArticle(publisherDomain, articleId, url).then((res) => {
            console.time('getSnippet');
            resolve(res);
          }).catch((err) =>{
            console.time('getSnippet');
            console.error(`getSnippet - unable to process url`, err);
            reject(err);
          });
        }
      });
    }
     
  });

};
