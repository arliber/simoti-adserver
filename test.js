const snippetServer = require('./snippetServer');

/*snippetServer.getSnippet('http://www.bizportal.co.il/mutualfunds/news/article/548104').then((entities) => {
  console.log(entities);
});*/

for(var i=0;i<100;i++)
snippetServer.getSnippetTest('123456', i).then((e) => {
  //console.log(e);
})

