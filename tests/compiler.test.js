const snippetCompiler = require('../functions/snippetCompiler');

snippetCompiler.applySnippet(5091364022779904, 'martech.zone', 'ecommerce-shipping-options')
//snippetCompiler.applySnippet(5682617542246400, 'martech.zone', 'randy-stocklin-ecommerce')
.then((result) => {
  console.log(result);
})
.catch((err) => {
  console.log(err);
});