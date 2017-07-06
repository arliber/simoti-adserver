'use strict';

module.exports = (rawArticle) => {
  return [
    {
      name: 'title',
      value: rawArticle.title ? rawArticle.title : '',
      excludeFromIndexes: true
    },
    {
      name: 'content',
      value: rawArticle.content ? rawArticle.content : '',
      excludeFromIndexes: true
    },
    {
      name: 'url',
      value: rawArticle.url ? rawArticle.url : '',
      excludeFromIndexes: true
    },
    {
      name: 'status',
      value: rawArticle.status ? rawArticle.status : '',
      excludeFromIndexes: true
    },
    {
      name: 'snippetProperties',
      value: rawArticle.snippetProperties ? rawArticle.snippetProperties : {},
      excludeFromIndexes: true
    },
    {
      name: 'snippetHTML',
      value: rawArticle.snippetHTML ? rawArticle.snippetHTML : '',
      excludeFromIndexes: true
    }
  ];
};
