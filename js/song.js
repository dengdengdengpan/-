


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
querySong.get(songId).then(function(song) {
    let coverUrl = song.attributes.cover;
    let songUrl = song.attributes.url;

    initCover(coverUrl);
    initSongInfor(song);
    initPlayer(songUrl);
    
});

function initCover(coverUrl) {
    let wholeBkground = document.querySelector('.whole-bkground');
    let coverImg = document.querySelector('.disc .cover > img');
    wholeBkground.style.backgroundImage = 'url(' + coverUrl + ')';
    coverImg.src = coverUrl;
}


function initPlayer(songUrl) {
    let discHalo = document.querySelector('.disc .disc-halo');
    let songCover = document.querySelector('.disc .cover');
    let playBtn = document.querySelector('.play-btn');
    let clickWrap = document.querySelector('.click-wrap');
    let elAudio = document.createElement('audio');
    let lyricShow = document.querySelector('.lyric-show');
    let lyricLines = document.querySelector('.lyric-lines');
    let lyricLine = document.getElementsByClassName('lyric-line');
    let whichLine;
    
    elAudio.src = songUrl;
    // canplay--->在媒体数据已经有足够的数据（至少播放数帧）可供播放时触发
    elAudio.addEventListener('canplay',function() {
        console.log('可以播放了');
        clickWrap.addEventListener('click',function() {
            console.log('这是可点击区域');
            // HTMLMediaElement.paused--->告诉音频是否暂停，true表示暂停中，false表示没有暂停
            if (elAudio.paused) {
                elAudio.play();
                playBtn.classList.add('hide');
                discHalo.classList.add('playing');
                songCover.classList.add('playing');
            } else {
                elAudio.pause();
                playBtn.classList.remove('hide');
                discHalo.classList.remove('playing');
                songCover.classList.remove('playing');
            }
            setInterval(function() {
                let time = elAudio.currentTime;
                let minutes = parseInt(time / 60);
                let seconds = time - minutes * 60;
                let formatTime = `${pad(minutes)}:${pad(seconds)}`;
                
                for (let i = 0 ; i < lyricLine.length; i++) {
                    let currentLineTime = lyricLine[i].dataset.time;
                    let nextLineTime = lyricLine[i + 1].dataset.time;
                    if (lyricLine[i + 1] !== undefined && currentLineTime <= formatTime && nextLineTime > formatTime) {
                        console.log(lyricLine[i]);
                        whichLine = lyricLine[i];
                        break;
                    }
                }
                if (whichLine) {
                    whichLine.classList.add('playing');
                    whichLine.previousElementSibling.classList.remove('playing');
                    let top = whichLine.offsetTop - lyricShow.clientHeight / 3;
                    lyricLines.style.transform = `translateY(-${top}px)`;
                }
            },500);
        });
    });

    
    



    // ended--->播放结束时触发
    // elAudio.addEventListener('ended',function() {
    //     console.log('播放结束了');
    //     playBtn.classList.remove('hide');
    //     discHalo.classList.remove('playing');
    //     songCover.classList.remove('playing');
    //     console.log(elAudio.paused);
    //     elAudio.paused = true;
    //     clickWrap.addEventListener('click',function() {
    //         console.log('这是可点击区域');
    //         // HTMLMediaElement.paused--->告诉音频是否暂停，true表示暂停中，false表示没有暂停
    //         if (elAudio.paused) {
    //             elAudio.play();
    //             playBtn.classList.add('hide');
    //             discHalo.classList.add('playing');
    //             songCover.classList.add('playing');
    //         } else {
    //             elAudio.pause();
    //             playBtn.classList.remove('hide');
    //             discHalo.classList.remove('playing');
    //             songCover.classList.remove('playing');
    //         }
    //     });
    // });   
}

function pad(num) {
    return num > 10 ? num + '' : '0' + num;
}

function initSongInfor(song) {
    let songInfor = document.querySelector('.song-infor');
    let songName = document.querySelector('.song-infor .name');
    let songIntro = document.querySelector('.song-infor .intro');
    let songSinger = document.querySelector('.song-infor .singer');
    songName.textContent = song.attributes.name;
    songIntro.textContent = song.attributes.intro;
    songSinger.textContent = song.attributes.singer;
    parseLyric(song);
}

function parseLyric(song) {
    let lyricLines = document.querySelector('.song-infor .lyric-lines');
    let arrLyric = song.attributes.lyric.split('\n');
    
    let lyricRegex = /^\[(.+)\](.*)/;

    arrLyric = arrLyric.map(function(str) {
        let result = str.match(lyricRegex);
        if (result) {
            return {
                time: result[1],
                lyric: result[2]
            }
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