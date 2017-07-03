const snippetServer = require('./snippetServer');

var url = 'http://m.sponser.co.il/article.php?id=81234';
snippetServer.getSnippet(url).then((entities) => {
  console.log(entities);
}).catch((err) => {
  console.error(err);
});
