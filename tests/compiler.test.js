const snippetCompiler = require('../functions/snippetCompiler');

snippetCompiler.applySnippet(5664248772427776, 'gadgety.co.il', '183766')
.then((result) => {
  console.log(result);
})
.catch((err) => {
  console.log(err);
});