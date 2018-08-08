import {
    getSongUrl,
    getLyric
} from 'api/song'
import {
    ERR_OK
} from 'api/config'
import {
    Base64
} from 'js-base64'
export default class Song {
    constructor({
        id,
        mid,
        singer,
        name,
        album,
        duration,
        image
    }) {
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
    }

    url() {
        return getSongUrl(this.mid)
    }

    getLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }
        return getLyric(this.mid).then(res => {
            if (res.code === ERR_OK) {
                this.lyric = Base64.decode(res.lyric)
                return Promise.resolve(this.lyric)
            } else {
                return Promise.reject("no lyric")
            }
        })
    }
}

export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${
      musicData.albummid
    }.jpg?max_age=2592000`
    });
}

function filterSinger(singer) {
    let ret = [];
    if (!singer) {
        return "";
    }
    singer.forEach(s => {
        ret.push(s.name);
    });
    return ret.join("/");
}