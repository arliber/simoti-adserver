const snippetModel = require('../models/snippet.model');
let datastore = require('@google-cloud/datastore')({
  projectId: 'simoti-171512',
  keyFilename: './keyfile.json'
});

function saveNewSnippet() {
  const key = datastore.key(['snippets']);
  const entity = {
    key,
    data: snippetModel()
  };
  return datastore.save(entity);
}

saveNewSnippet().then((res) => {
  console.log('Saved', res);
}).catch((e) => {
  console.error('Error', e);
})