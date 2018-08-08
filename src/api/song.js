import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {
    commonParams,
    callbackOptions,
    ERR_OK
} from 'api/config'

const debug = process.env.NODE_ENV != 'production'

export function getLyric(mid) {
    const url = debug ? "/lyric/fcgi-bin/fcg_query_lyric_new.fcg" : "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg";
    const data = Object.assign({}, commonParams, {
        songmid: mid,
        pcachetime: new Date().getTime(),
        loginUin: 0,
        hostUin: 0,
        format: "json",
        platform: "yqq",
        needNewCode: 0
    })
    return axios.get(url, {
        params: data
    }).then(res => {
        var ret = res.data;
        if (typeof ret === 'string') {
            var reg = /^\w+\(({[^()]+})\)$/
            var matches = ret.match(reg)
            if (matches) {
                ret = JSON.parse(matches[1])
            }
        }
        return Promise.resolve(ret)
    })
}

export function getSongUrl(songmid) {
    const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
    var data = Object.assign({}, commonParams, {
        loginUin: 0,
        format: 'json',
        platform: 'yqq',
        cid: '205361747',
        uin: 0,
        guid: 9468369440,
        songmid: songmid,
        filename: `C400${songmid}.m4a`
    })
    return jsonp(url, data, callbackOptions).then((res) => {
        if (res.code === ERR_OK) {
            let vkey = res.data.items[0].vkey;
            let songUrl = `http://dl.stream.qqmusic.qq.com/C400${songmid}.m4a?vkey=${vkey}&guid=9468369440&uin=0&fromtag=66`
            return Promise.resolve(songUrl)
        }
    })
}