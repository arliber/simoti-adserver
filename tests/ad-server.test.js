const snippetServer = require('../functions/snippetServer');

//var url = 'http://m.sponser.co.il/article.php?id=81234';
//var url = 'http://www.gadgety.co.il/183779/huawei-mate-10-details-leak/';
var url = 'https://martech.zone/10-facts-will-surprise-social-media/';

snippetServer.getSnippet(url).then((entities) => {
  console.log(entities);
}).catch((err) => {
  console.error(err);
});
