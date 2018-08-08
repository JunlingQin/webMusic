// const axios = require('axios');
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
    productionSourceMap: false,
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('&', resolve('src'))
            .set('api', resolve('src/api'))
            .set('base', resolve('src/base'))
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'))
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: true,
        proxy: {
            '/splcloud': {
                target: 'https://c.y.qq.com',
                changeOrigin: true,
                secure: true,
                headers: {
                    referer: 'https://y.qq.com/',
                    host: 'c.y.qq.com'
                }
            },
            '/lyric': {
                target: 'https://c.y.qq.com',
                changeOrigin: true,
                secure: true,
                headers: {
                    referer: 'https://y.qq.com/portal/player.html',
                    host: 'c.y.qq.com'
                }
            },
            '/qzone': {
                target: 'https://c.y.qq.com',
                changeOrigin: true,
                secure: true,
                headers: {
                    referer: 'https://y.qq.com/n/yqq',
                    host: 'c.y.qq.com'
                }
            }
        }
        // after(app) {
        //     app.get('/splcloud', function (req, res) {
        //         const url = "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg"
        //         axios.get(url, {
        //             headers: {
        //                 referer: 'https://y.qq.com/',
        //                 host: 'c.y.qq.com'
        //             },
        //             params: req.query
        //         }).then((response) => {
        //             res.json(response.data)
        //         }).catch((e) => {
        //             console.log(e);
        //         })
        //     })
        // }
    }
}