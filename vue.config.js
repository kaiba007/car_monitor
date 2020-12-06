const webpack = require("webpack");
const path = require('path');//引入path模块
function resolve(dir){
  return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
  // baseUrl: '/',
  devServer:{
    port:8994,
    open:true,
    //assetsSubDirectory: 'static',
    //assetsPublicPath: '/',
    proxy: {     //axios跨域处理
      '/api': {       //此处并非和url一致
        target:'http://120.24.6.16:8004/edu/',
        changeOrigin:true, //允许跨域
        pathRewrite:{
          '^/api': ''
        }
      }
    }
  },
  //配置路径别名
  chainWebpack:(config)=>{
    config.resolve.alias
        .set('@',resolve('src'))
        .set('components',resolve('src/components'))
        .set('assets',resolve('src/assets'))
        .set('common',resolve('src/common'))
        .set('network',resolve('src/network'))
        .set('utils',resolve('src/utils'))

    //set第一个参数：设置的别名，第二个参数：设置的路径
  },
  //安装jquery的时候添加的配置信息
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    ]
  }
}
