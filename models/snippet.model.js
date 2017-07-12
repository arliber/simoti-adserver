'use strict';

module.exports = (rawSnippet) => {
  rawSnippet = rawSnippet ? rawSnippet : {};

  return [
    {
      name: 'title',
      value: rawSnippet.title ? rawSnippet.title : '',
      excludeFromIndexes: true
    },
    {
      name: 'content',
      value: rawSnippet.content ? rawSnippet.content : '',
      excludeFromIndexes: true
    },
    {
      name: 'actionButtonText',
      value: rawSnippet.actionButtonText ? rawSnippet.actionButtonText : '',
      excludeFromIndexes: true
    },
    {
      name: 'actionButtonURL',
      value: rawSnippet.actionButtonURL ? rawSnippet.actionButtonURL : '',
      excludeFromIndexes: true
    },
    {
      name: 'creditLine1',
      value: rawSnippet.creditLine1 ? rawSnippet.creditLine1 : '',
      excludeFromIndexes: true
    },
    {
      name: 'creditLine2',
      value: rawSnippet.creditLine2 ? rawSnippet.creditLine2 : '',
      excludeFromIndexes: true
    },
    {
      name: 'creditLineImageURL',
      value: rawSnippet.creditLineImageURL ? rawSnippet.creditLineImageURL : '',
      excludeFromIndexes: true
    },
    {
      name: 'publishersBlackList',
      value: rawSnippet.publishersBlackList ? rawSnippet.publishersBlackList : [],
      excludeFromIndexes: true
    },
    {
      name: 'wordsBlackList',
      value: rawSnippet.wordsBlackList ? rawSnippet.wordsBlackList : [],
      excludeFromIndexes: true
    },
    {
      name: 'status',
      value: rawSnippet.status ? rawSnippet.status : 'active',
      excludeFromIndexes: true
    },
    {
      name: 'tags',
      value: rawSnippet.tags ? rawSnippet.tags : [],
      excludeFromIndexes: true
    },
    {
      name: 'createDate',
      value: rawSnippet.createDate ? rawSnippet.createDate : '',
      excludeFromIndexes: true
    },
    {
      name: 'updateDate',
      value: rawSnippet.updateDate ? rawSnippet.updateDate : '',
      excludeFromIndexes: true
    },
    {
      name: 'language',
      value: rawSnippet.language ? rawSnippet.language : '',
      excludeFromIndexes: true
    },
    {
      name: 'clickTrackingLink',
      value: rawSnippet.clickTrackingLink ? rawSnippet.clickTrackingLink : '',
      excludeFromIndexes: true
    },
    {
      name: 'impressionTrackingLink',
      value: rawSnippet.impressionTrackingLink ? rawSnippet.impressionTrackingLink : '',
      excludeFromIndexes: true
    },
    {
      name: 'wordPouch',
      value: rawSnippet.wordPouch ? rawSnippet.wordPouch : [],
      excludeFromIndexes: true
    },
    {
      name: 'wordPouchScores',
      value: rawSnippet.wordPouchScores ? rawSnippet.wordPouchScores : [],
      excludeFromIndexes: true
    }
  ];
};
