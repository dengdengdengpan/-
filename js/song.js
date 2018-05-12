let urlParams;
(window.onpopstate = function () {
    let match,
        pl = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        query  = window.location.search.substring(1);
    function decode(string) {
        return decodeURIComponent(string.replace(pl,' '));
    }
    urlParams = {};
    while (match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2]);
    }  
    return urlParams;   
})();


let songId = urlParams.id;
let clickWrap = document.querySelector('.click-wrap');
let docFragment = document.createDocumentFragment();
let wholeBkground = document.querySelector('.whole-bkground');
let lyricLines = document.querySelector('.song-intro .lyric-lines');
let discHalo = document.querySelector('.song-wrap .disc .disc-halo');
let songCover = document.querySelector('.song-wrap .disc .cover');
let coverImg = document.querySelector('.song-wrap .disc .cover > img');
let playBtn = document.querySelector('.song-wrap .play-btn');

let querySong = new AV.Query('SongList');
querySong.get(songId).then(function(song) {
    // 封面图片
    let coverUrl = song.attributes.cover;
    wholeBkground.style.backgroundImage = 'url(' + coverUrl + ')';
    coverImg.src = coverUrl;

    let arrLyric = song.attributes.lyric.split('\n');
    let regex = /^\[(.+)\](.*)/;
    arrLyric = arrLyric.map(function(str) {
        let result = str.match(regex);
        if (result) {
            return {
                time: result[1],
                lyric: result[2]
            }
        }
    });
    console.log(song.attributes.lyric)
    for (let i = 0; i < arrLyric.length; i++) {
        // 如果arrLyric有undefined 则退出循环
        if (!arrLyric[i]) {
            break;
        }
        let p = document.createElement('p');
        p.setAttribute('data-time',arrLyric[i].time);
        p.textContent = arrLyric[i].lyric;
        docFragment.appendChild(p);
    }
    lyricLines.appendChild(docFragment);


    let elAudio = document.createElement('audio');
    elAudio.src = song.attributes.url;

    clickWrap.addEventListener('click',function(event) {
        if (elAudio.paused) {
            elAudio.play();
            playBtn.classList.add('hide');
            discHalo.style.webkitAnimationPlayState = 'running';
            songCover.style.webkitAnimationPlayState = 'running';
            isPaused = true;
        } else {
            elAudio.pause();
            playBtn.classList.remove('hide');
            discHalo.style.webkitAnimationPlayState = 'paused';
            songCover.style.webkitAnimationPlayState = 'paused';
        }
        // ended--->播放结束时触发
        elAudio.addEventListener('ended',function() {
            songCircle.classList.remove('playing');
            songCover.classList.remove('playing');
            playBtn.classList.add('show');
        });        
    });


});
