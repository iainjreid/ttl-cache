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
    ttl: ttl ? ttl : null,
    ttlStart: ttl ? new Date().getTime() : null
  };
  
  if (ttl && typeof ttl === 'number') setTimeout(function () {
    delete this.memory[identifier]
  }.bind(this), ttl);
  
  if (callback) callback()
};

/** Read from cache:
 *
 *  @param  identifier  {string}
 *  @param  callback    {function}  optional - upon reading the cache, two arguements are returned, an error and a data object
 */
cache.read = function (identifier, callback) {
  if (callback) callback(this.memory[identifier] ? null : {
    message: 'Data at the specified identifier code not be found'
  }, this.memory[identifier] ? this.memory[identifier].data : null);
  else if (this.memory[identifier]) return this.memory[identifier].data;
};

/** Delete from cache:
 *
 *  @param  identifier  {string}
 *  @param  callback    {function}
 */
cache.delete = function (identifier, callback) {
  delete this.memory[identifier];
  
  if (callback) callback()
};

/** Destroy cache:
 *
 *  @param  callback  {function}
 */
cache.destroy = function (callback) {
  this.memory = {};
  
  if (callback) callback(null, {
    error: false,
    success: true,
    message: 'Cache now empty'
  })
};

module.exports = cache