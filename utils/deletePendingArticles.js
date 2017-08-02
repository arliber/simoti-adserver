const datastoreModel = require('../datastore.model');
let datastore = require('@google-cloud/datastore')({
  projectId: 'simoti-171512',
  keyFilename: './keyfile.json'
});

datastoreModel.getArticlesByStatus('pending').then((articles) => {
  console.log(`got ${articles.length} articles`)
  articles.forEach((article) => {
    
    console.log(`getArticlesByStatus: working on url [${article[datastore.KEY]}]`);
    datastore.delete(article[datastore.KEY]).then((m) => {
      console.log('success: ', m);
    }).catch((e) => {
      console.error('erro: ', e);
    })
  })
}).catch((e) => {
  console.error('deletePendingArticles: ', e);
})