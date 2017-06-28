const snippetServer = require('./snippetServer');

var url = 'http://www.gadgety.co.il/183202/huawei-mate-10-rumors-begin/';
//var url = 'http://www.bizportal.co.il/mutualfunds/news/article/548104';

snippetServer.getSnippet(url).then((entities) => {
  console.log(entities);
}).catch((err) => {
  console.error(err);
});