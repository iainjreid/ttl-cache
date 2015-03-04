var cache = require('./index.js'),
    exampleMessage = 'This is an example message';

console.log('\nThe following will showcase four examples on how this module may be used.')

/** Note:
 *
 *  Data may be cached indefinitely, or until the application is closed by any means.
 */
console.log('\nData may be cached indefintely:');
console.log(' - Writing the following to the cache: "' + exampleMessage + '"');

cache.write('foo', exampleMessage);

console.log(' - Reading the cache, the data returned is: "' + cache.read('foo') + '"');

/** Note:
 *
 *  Data may also be cached and set for removal at a later date.
 */
console.log('\nCached data may be given a TTL (time-to-live):');
console.log(' - Writing the folowing to the cache: "' + exampleMessage + '", however a TTL has been specified of 5 seconds');

cache.write('bar', exampleMessage, 5000, function () {
  for (var i = seconds = 1; i < 6; i++) setTimeout(function () {
    console.log(' - Reading the cache, the data returned is: "' + cache.read('bar') + '", after ' + seconds++ + ' second(s)');
    
    if (seconds === 6) ttlTouchExample()
  }, parseInt(i + '000'))
});

/** Note:
 *
 *  Cached data with a TTL specified can have their TTL reset and/or changed.
 */
function ttlTouchExample () {
  console.log('\nPreviously cached data with a TTL (time-to-live), may have these values reset, or renewed:');
  console.log('(the TTL will be refreshed once every second, for two seconds, and then allowed to die)')
  console.log(' - Writing the folowing to the cache: "' + exampleMessage + '", with a TTL of 1.5 seconds');

  cache.write('far', exampleMessage, 1500, function () {
    for (var i = seconds = 1; i < 6; i++) setTimeout(function () {
      console.log(' - Reading the cache, the data returned is: "' + cache.read('far') + '", after ' + seconds++ + ' second(s)');
      
      if (seconds < 4) cache.touch('far');
      else if (seconds === 6) destroyCacheExample()
    }, parseInt(i + '000'))
  })
}

/** Note:
 *
 *  The cache can be flushed if required to.
 */
function destroyCacheExample () {
  console.log('\nThe cache can be flushed at any time if requried:');
  
  cache.destroy(function(err, success) {
    if (err) throw (err);
    else {
      console.log(' - Reading the cache at "foo", the data returned is: "' + cache.read('foo') + '"');
      console.log(' - Reading the cache at "bar", the data returned is: "' + cache.read('bar') + '"');
      console.log(' - etc...')
    }
  })
}