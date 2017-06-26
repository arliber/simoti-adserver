var datastore = require('@google-cloud/datastore')({
  projectId: 'simoti-171512',
  keyFilename: './keyfile.json'
});

exports.getSnippetTest = (advId,i) => {
  console.time('getSnippetTest'+i);
  return new Promise((resolve, reject) => {
    var query = datastore.createQuery('snippets')
                          .filter('advertiserId', '=', advId);

    query.run(function(err, entities, info) {
      console.timeEnd('getSnippetTest'+i);
      if(entities.length) {
        console.log(`getSnippet: Returning snippet [${entities[0][datastore.KEY]}]`)
        resolve(entities[0]);
      } else {
        resolve({ error: 'no snippet' });
      }
    });
  });  
}

exports.getSnippet = (url) => {
  console.time('getSnippet');
  return new Promise((resolve, reject) => {
    var query = datastore.createQuery('snippets')
                         .filter('container.url', '=', url)
                         .filter('container.status', '=', 'active');

    query.run(function(err, entities, info) {
      console.timeEnd('getSnippet');
      if(entities.length) {
        console.log(`getSnippet: Returning snippet [${entities[0][datastore.KEY]}]`)
        resolve(entities[0]);
      } else {
        resolve({ error: 'no snippet' });
      }
    });

  });

};