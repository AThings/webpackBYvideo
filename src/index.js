// webapck 打包图片
// 1) 在js中创建引用
// file-loader 生成图片到打包后的目录下 返回一个新图片地址
import img from './atago.jpg' // 引入图片 需要file-loader
let image = new Image()
image.src = img
console.log(img)
document.body.appendChild(image)
// 2) 在css引入background('url')

// 3) <img src="" alt="">
// html-withimg-loader 解析html编译图片

//import $ from 'expose-loader?$!jquery'  // 内联loader 写在代码里的loader
//  import $ from 'jquery'
// console.log(window.$,'window')
// console.log($,'$')

/*    引入第三方模块
 *    1、expose-loader暴露到window上
 *    2、providePlugin给每个文件提供$
 *    3、引入不打包
 * 
 * 
 * 
 * 
 * 
 * 
 */
let str = require('./a.js')
console.log('hello ' + str.default)
require('./index.css')
require('./a.less')

let fn=() =>{
    console.log('fengjialue this is es6')
}
fn()

@log
class A{
    a = 1
}
let Aclass = new A()
console.log(Aclass.a)

function log(target){
    console.log(target,'23')
}