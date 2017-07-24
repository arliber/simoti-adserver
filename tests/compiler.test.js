const snippetCompiler = require('../functions/snippetCompiler');

//snippetCompiler.applySnippet(5091364022779904, 'martech.zone', 'ecommerce-shipping-options')
//snippetCompiler.applySnippet(5682617542246400, 'martech.zone', 'randy-stocklin-ecommerce')
//snippetCompiler.applySnippet(5664248772427776, 'gadgety.co.il', '183766') //bug
//snippetCompiler.applySnippet(5700305828184064, 'gadgety.co.il', '184326') //huawei
snippetCompiler.applySnippet(5648554290839552, 'tgspot.co.il', 'oneplus-5-is-now-official') //huawei
//snippetCompiler.applySnippet(5676073085829120, 'tgspot.co.il', 'legion-by-lenovo-launched-in-israel') //bug
.then((result) => {
  console.log(result);
})
.catch((err) => {
  console.log(err);
});