function getId() {
    let search = document.location.search;
    let regex = /\bid=([^&*]+)/;
    let id = search.match(regex)[1];
    return id; 
}

let songId = getId();

let docFragment = document.createDocumentFragment();

// 查询歌曲
let querySong = new AV.Query('SongList');
querySong.get(songId).then(function(songObj) {
    let song = songObj.attributes;
    let coverUrl = song.cover;
    let songUrl = song.url;

    initTitle(song);
    initCover(coverUrl);
    initSongInfor(song);
    initPlayer(songUrl);
    
});

function initTitle(song) {
    if (song.intro) {
        document.title = `${song.name} - ${song.intro} - ${song.singer} - 单曲 - 网易云音乐`;
    } else {
        document.title = `${song.name} - ${song.singer} - 单曲 - 网易云音乐`;
    }
}

function initCover(coverUrl) {
    let wholeBkground = document.querySelector('.whole-bkground');
    let coverImg = document.querySelector('.disc .cover > img');
    wholeBkground.style.backgroundImage = 'url(' + coverUrl + ')';
    coverImg.src = coverUrl;
}


function initPlayer(songUrl) {
    let disc = document.querySelector('.song-wrap .disc');
    let playBtn = document.querySelector('.play-btn');
    let clickWrap = document.querySelector('.click-wrap');
    let elAudio = document.createElement('audio');
    let lyricShow = document.querySelector('.lyric-show');
    let lyricLines = document.querySelector('.lyric-lines');
    let lyricLine = document.getElementsByClassName('lyric-line');
    let whichLine;
    
    elAudio.src = songUrl;

    // canplay--->在媒体数据已经有足够的数据（至少播放数帧）可供播放时触发
    // elAudio.addEventListener('canplay',function() {
        console.log('可以播放了');
        clickWrap.addEventListener('click',function() {
            // HTMLMediaElement.paused--->只读，告诉音频是否暂停，默认是true表示暂停中，false表示没有暂停
            if (!elAudio.paused) {
                elAudio.pause();
                playBtn.classList.remove('hide');
                disc.classList.remove('playing');
            } else {
                elAudio.play();
                playBtn.classList.add('hide');
                disc.classList.add('playing');
            }
        });
    // });

    // ended--->播放结束时触发
    elAudio.addEventListener('ended',function() {
        console.log('播放结束了');
        playBtn.classList.remove('hide');
        disc.classList.remove('playing');
    });

    setInterval(function() {
        let time = elAudio.currentTime;
        
        for (let i = 0 ; i < lyricLine.length; i++) {
            // 如果当前行的下一行是undefined，则其是最后一行，将当前行赋值给whichLine后退出循环
            if (lyricLine[i + 1] === undefined) {
                whichLine = lyricLine[i];
                break;
            }
            let currentLineTime = lyricLine[i].dataset.time;
            let nextLineTime = lyricLine[i + 1].dataset.time;
            // 当前行的时间 <= 歌曲播放的当前时间 < 当前行的下一行时间，则应该出现的歌词是当前行
            if (currentLineTime <= time && nextLineTime > time) {
                whichLine = lyricLine[i];
                break;
            }
        }
        if (whichLine) {
            // 如果当前行没有前一行的情况
            if (whichLine.previousElementSibling !== null) {
                whichLine.classList.add('playing');
                whichLine.previousElementSibling.classList.remove('playing');
            } else {
                whichLine.classList.add('playing');
            }
            let top = whichLine.offsetTop - lyricShow.clientHeight / 3;
            lyricLines.style.transform = `translateY(-${top}px)`;
        }
    },500);
}

function initSongInfor(song) {
    let songTitle = document.querySelector('.song-infor .song-title');
    if (song.intro) {
        songTitle.textContent = `${song.name}${song.intro} - ${song.singer}`;
    } else {
        songTitle.textContent = `${song.name} - ${song.singer}`;
    }
    parseLyric(song);
}

function parseLyric(song) {
    let lyricLines = document.querySelector('.song-infor .lyric-lines');
    let parts = song.lyric.split('\n');
    let arrLyric = [];
    
    let lyricRegex = /^\[(.+)\](.*)/;
    let timeRegex = /(\d+):([\d.]+)/;
    parts.forEach(function(str) {
        let result = str.match(lyricRegex);
        let lyricTime = result[1].match(timeRegex);
        let minute = +lyricTime[1];
        let seconds = +lyricTime[2];
        if (result) {
            arrLyric.push({
                time: minute * 60 + seconds,
                lyric: result[2]
            });
        }
    });
    for (let i = 0; i < arrLyric.length; i++) {
        // 如果arrLyric有undefined 则退出循环
        if (!arrLyric[i]) {
            break;
        }
        let p = document.createElement('p');
        p.dataset.time = arrLyric[i].time;
        p.setAttribute('class','lyric-line');
        p.textContent = arrLyric[i].lyric;
        docFragment.appendChild(p);
    }
    
    lyricLines.appendChild(docFragment);
}