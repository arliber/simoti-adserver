module.exports.tagLogger = (req) => {
  console.log(`Source: ${req.headers.referer?req.headers.referer:'unknown'}`, req.body);
};
