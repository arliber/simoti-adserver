'use strict';

module.exports = (rawSnippet) => {
  rawSnippet = rawSnippet ? rawSnippet : {};

  return [
    {
      name: 'template',
      value: rawSnippet.template ? rawSnippet.template : 'default',
      excludeFromIndexes: false
    },
    {
      name: 'title',
      value: rawSnippet.title ? rawSnippet.title : '',
      excludeFromIndexes: false
    },
    {
      name: 'content',
      value: rawSnippet.content ? rawSnippet.content : '',
      excludeFromIndexes: false
    },
    {
      name: 'actionButtonText',
      value: rawSnippet.actionButtonText ? rawSnippet.actionButtonText : '',
      excludeFromIndexes: false
    },
    {
      name: 'actionButtonURL',
      value: rawSnippet.actionButtonURL ? rawSnippet.actionButtonURL : '',
      excludeFromIndexes: false
    },
    {
      name: 'creditLine1',
      value: rawSnippet.creditLine1 ? rawSnippet.creditLine1 : '',
      excludeFromIndexes: false
    },
    {
      name: 'creditLine2',
      value: rawSnippet.creditLine2 ? rawSnippet.creditLine2 : '',
      excludeFromIndexes: true
    },
    {
      name: 'creditLineImageURL',
      value: rawSnippet.creditLineImageURL ? rawSnippet.creditLineImageURL : '',
      excludeFromIndexes: false
    },
    {
      name: 'publishersBlackList',
      value: rawSnippet.publishersBlackList ? rawSnippet.publishersBlackList : [NaN],
      excludeFromIndexes: false
    },
    {
      name: 'wordsBlackList',
      value: rawSnippet.wordsBlackList ? rawSnippet.wordsBlackList : [NaN],
      excludeFromIndexes: false
    },
    {
      name: 'status',
      value: rawSnippet.status ? rawSnippet.status : 'active',
      excludeFromIndexes: false
    },
    {
      name: 'tags',
      value: rawSnippet.tags ? rawSnippet.tags : [NaN],
      excludeFromIndexes: false
    },
    {
      name: 'createDate',
      value: rawSnippet.createDate ? rawSnippet.createDate : new Date(),
      excludeFromIndexes: false
    },
    {
      name: 'updateDate',
      value: rawSnippet.updateDate ? rawSnippet.updateDate : new Date(),
      excludeFromIndexes: false
    },
    {
      name: 'language',
      value: rawSnippet.language ? rawSnippet.language : '',
      excludeFromIndexes: false
    },
    {
      name: 'clickTrackingLink',
      value: rawSnippet.clickTrackingLink ? rawSnippet.clickTrackingLink : '',
      excludeFromIndexes: false
    },
    {
      name: 'impressionTrackingLink',
      value: rawSnippet.impressionTrackingLink ? rawSnippet.impressionTrackingLink : '',
      excludeFromIndexes: false
    },
    {
      name: 'wordPouch',
      value: rawSnippet.wordPouch ? rawSnippet.wordPouch : [NaN],
      excludeFromIndexes: true
    },
    {
      name: 'wordPouchScores',
      value: rawSnippet.wordPouchScores ? rawSnippet.wordPouchScores : [NaN],
      excludeFromIndexes: true
    }
  ];
};
