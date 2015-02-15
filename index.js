/*  TTL cache:
 *
 */
var cache = {
  memory: {}
}

/*  Save to cache:
 *
 *  @param  identifier  {string}
 *  @param  data        {string}
 *  @param  callback    {function}
 */
cache.write = function (identifier, data, callback) {
  this.memory[identifier] = data;
  
  if (callback) callback()
}

/*  Read from cache:
 *
 *  @param  identifier  {string}
 *  @param  callback    {function}
 */
cache.read = function (identifier, callback) {
  return this.memory[identifier];
  
  if (callback) callback()
}

/*  Delete from cache:
 *
 *  @param  identifier  {string}
 *  @param  callback    {function}
 */
cache.delete = function (identifier, callback) {
  delete this.memory[identifier]
  
  if (callback) callback()
}

/*  Destroy cache:
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
}

module.exports = cache