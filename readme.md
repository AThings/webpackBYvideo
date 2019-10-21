#### 2019-10-20 9 全局变量引入问题
* 1、expose-loader暴露到window上
  ``` 
  index.js
       import $ from 'expose-loader?$!jquery'  // 内联loader 写在代码里的loader
  ```
  ```
  webpack.config.js
       module:{
           rules:[
               {
                   test:require.reslove('jquery'), // 当文件中引入jquery时
                   use:'expose-loader?$'
               }
           ]
       }
  ```
* 2、providePlugin给每个文件提供$
   ```  
   webapck.config.js
      let webpack = require('webpack')
      plugins:[
          new webpack.ProvidePlugin({
              $:'jquery'
          })
      ]
   ```
* 3、引入不打包
    ```
    index.html
        <script src='https://code.jquery.com/jquery-3.4.1.min.js'></script>
    ```
    ```
    index.js
        import $ from 'jquery'  // 重复引用
    ```
    ```
    webpack.config.js
        externals:{
            jquery:'$'
        }
    ```
#### 2019-10-20 10 处理图片
* 1)在js中创建引用
```
index.js
    // file-loader 生成图片到打包后的目录下 返回一个新图片地址
    import img from './atago.jpg' // 引入图片 需要file-loader
    let image = new Image()
    image.src = img
    console.log(img)
    document.body.appendChild(image)
```
```
webpack.config.js
    module:{
        rules:[
            {
                test:/\.(png|jpg|gif)$/,
                use:'file-loader'
            }
        ]
    }
```
* 2)在css使用background('url')
```
index.css
    // css-loader 会处理图片
    body {
        background-color: red;
        background-image: url('./atago.jpg')
    }
```
* 3)html中img标签
```
index.html
    // html-withimg-loader 解析html编译图片
    <img src="./atago.jpg" alt="">
```
```
webpack.config.js
    module:{
        rules:[
            {
                test: /.\html$/,
                use: 'html-withimg-loader'
            }
        ]
    }
```
* 4)使用更常用的url-loader处理图片
```
webpack.config.js
    module:{
        rules:[
            {
                test:/\.(png|jpg|gif)/,
                use:{
                    // 设定一个限制 当小于多少k时转为base64 否则使用file-loader (不需要配置file-loader)
                    loader:url-loader,
                    options:{
                        limit:50*1024
                    }
                }
            }
        ]
    }