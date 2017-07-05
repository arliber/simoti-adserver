const snippetCompiler = require('../functions/snippetCompiler');

snippetCompiler.applySnippet(5649391675244544, 'gadgety.co.il', '183059')
.then((result) => {
  console.log(result);
})
.catch((err) => {
  console.log(err);
});