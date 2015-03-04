/** TTL cache:
 *
 */
var cache = {
  memory: {}
};

/** Save to cache:
 *
 *  @param  identifier  {string}
 *  @param  data        {string}
 *  @param  ttl         {int}       optional
 *  @param  callback    {function}
 */
cache.write = function (identifier, data, ttl, callback) {
  this.memory[identifier] = {
    identifier: identifier,
    data: data,
    execution: (ttl && typeof ttl === 'number') ? setTimeout(function () {
      delete this.memory[identifier]
    }.bind(this), ttl) : null,
    ttl: ttl ? ttl : null
  };
  
  if (callback) callback()
};

/** Read from cache:
 *
 *  @param  identifier  {string}
 *  @param  callback    {function}  optional - upon reading the cache, two arguements are returned, an error and a data object
 */
cache.read = function (identifier, callback) {
  if (callback) callback(this.memory[identifier] ? null : {
    message: 'Data at the specified identifier code not be found.'
  }, this.memory[identifier] ? this.memory[identifier].data : null);
  else if (this.memory[identifier]) return this.memory[identifier].data;
};

/** Touch cached data:
 *
 *  @param  identifier  {string}
 *  @param  ttl         {int}       optional
 *  @param  callback    {function}  optional - upon reading the cache, two arguements are returned, an error and a data object
 */
cache.touch = function (identifier, ttl, callback) {
  if (!this.memory[identifier] && callback) callback({
    message: 'Data at the specified identifier code not be found.'
  } , null);
  else if (!this.memory[identifier]) return;
  
  clearTimeout(this.memory[identifier].execution);
  this.memory[identifier].execution =  setTimeout(function () {
    delete this.memory[identifier]
  }.bind(this), ttl || this.memory[identifier].ttl);
  
  if (callback) callback(null, {
    message: 'The TTL at: "' + identifier + '" has been reset.'
  })
};

/** Delete from cache:
 *
 *  @param  identifier  {string}
 *  @param  callback    {function}
 */
cache.delete = function (identifier, callback) {
  if (!this.memory[identifier] && callback) callback({
    message: 'Data at the specified identifier code not be found.'
  } , null);
  else if (!this.memory[identifier]) return;
  
  delete this.memory[identifier];
  
  if (callback) callback(null, {
    message: 'The data at: "' + identifier + '" has been removed.'
  })
};

/** Destroy cache:
 *
 *  @param  callback  {function}
 */
cache.destroy = function (callback) {
  this.memory = {};
  
  if (callback) callback(null, {
    message: 'The cache has been flushed.'
  })
};

module.exports = cache