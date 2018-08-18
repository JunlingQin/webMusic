import jsonp from 'common/js/jsonp'
import {
    commonParams,
    options
} from './config'

export function getTopList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
    const data = Object.assign({}, commonParams, {
        uin: 0,
        platform: "h5",
        needNewCode: 1,
        _: new Date().getTime(),
    })
    return jsonp(url, data, options)

    // const url = "/v8/fcg-bin/fcg_myqq_toplist.fcg"
    // const data = Object.assign({}, commonParams, {
    //     uin: 0,
    //     format: "json",
    //     platform: "h5",
    //     needNewCode: 1,
    //     _: new Date().getTime(),
    // })
    // return axios.get(url, {
    //     params: data
    // }).then(function (res) {
    //     var ret = res.data
    //     return Promise.resolve(ret)
    // })
}

export function getMusicList(topid) {
    const url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg"
    const data = Object.assign({}, commonParams, {
        uin: 0,
        platform: 'h5',
        needNewCode: 1,
        tpl: 3,
        page: "detail",
        type: "top",
        topid,
        _: new Date().getTime()
    })
    return jsonp(url, data, options)
}