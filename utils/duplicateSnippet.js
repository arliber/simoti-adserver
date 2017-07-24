const datastoreModel = require('../datastore.model');
const snippetModel = require('../models/snippet.model');
let datastore = require('@google-cloud/datastore')({
  projectId: 'simoti-171512',
  keyFilename: './keyfile.json'
});

function saveNewSnippet(snippet) {
  const key = datastore.key(['snippets']);
  const entity = {
    key,
    data: snippetModel(snippet)
  };
  return datastore.save(entity);
}

function duplciateSnippet(snipeptId) {
  return datastoreModel.getSnippetById(Number(snipeptId)).then((snippet) => {
    if (!snippet) {
      console.error(`duplciateSnippet: Snippet ${snipeptId} not found`);
    } else {
      return saveNewSnippet(snippet);
    }
  })
}


let snippetId = process.argv[2];
if(!snippetId) {
  console.error(`duplciateSnippet: No snippetId suplied (first argument`);
} else {
  duplciateSnippet(snippetId).then((res) => {
    console.log('Saved', res);
  }).catch((e) => {
    console.error('Error', e);
  })
}

