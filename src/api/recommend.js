import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {
    commonParams,
    options
} from './config'

const debug = process.env.NODE_ENV != 'production'

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })

    return jsonp(url, data, options)
}

export function getDiscList() {
    const url = debug ? '/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg' : 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
    const data = Object.assign({}, commonParams, {
        platform: 'yqq',
        loginUin: 0,
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    });
}

export function getSongList(disstid) {
    const url = '/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    const data = Object.assign({}, commonParams, {
        disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0,
        format: 'json'
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    });
}