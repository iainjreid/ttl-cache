var cache = require('./index.js'),
    exampleMessage = 'This is an example message';

console.log('\nThe following will showcase two examples on how this module may be used.')

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
 *  Data may also be cached and set for removeal at a later date.
 */
console.log('\nCached data may be given a TTL (time-to-live) index:');
console.log(' - Writing the folowing to the cache: "' + exampleMessage + '", however a TTL has been specified of 5 seconds');

cache.write('bar', exampleMessage, 5000, function () {
  
  for (var i = seconds = 1; i < 6; i++) setTimeout(function () {
    console.log(' - Reading the cache, the data returned is: "' + cache.read('bar') + '", after ' + seconds++ + ' second(s)');
  }, parseInt(i + '000'))
});