//module.exports = 'fengjialue'
import "core-js/stable";
import "regenerator-runtime/runtime";
export default 'fengjialue'
// require('@babel/polyfill')
class B{
    b='this is b'
}

function * gen() {
    yield 1;
}

console.log(gen().next())

console.log('aaa'.includes('a'))