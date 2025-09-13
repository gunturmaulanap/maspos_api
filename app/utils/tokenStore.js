const invalidatedTokens = new Set();

const invalidateToken = (token) => {
  invalidatedTokens.add(token);

 
  setTimeout(() => {
    invalidatedTokens.delete(token);
  }, 60 * 60 * 1000); 
};

const isTokenInvalidated = (token) => {
  return invalidatedTokens.has(token);
};

module.exports = {
  invalidateToken,
  isTokenInvalidated,
};
