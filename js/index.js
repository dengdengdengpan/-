/*tabs*/
let tabsLis = document.querySelectorAll('#content .tabs>li'),
    tabsCtLis = document.querySelectorAll('#content .tabs-content>li');
tabsLis.forEach(function(tabsli) {
    tabsli.addEventListener('click',function() {
        tabsLis.forEach(function(li) {
            li.classList.remove('active');
        });
        this.classList.add('active');
        let index = [].indexOf.call(tabsLis,this);
        tabsCtLis.forEach(function(tabsCtli) {
            tabsCtli.classList.remove('active');
        });
        tabsCtLis[index].classList.add('active');
    });
});

let elNmList = document.querySelector('#content .page-rec .nm-list');
let elHmList = document.querySelector('#content .page-hot .hm-list');

//查询歌曲数据
let querySongs = new AV.Query('SongList');
//对于是hotMusic的song，利用ascending()实现hotRank升序排列
querySongs.ascending('hotRank');
//将查询到的结果按照不同的条件插入页面中
querySongs.find().then(function(songs) {
    appendNewMusic(songs);
    appendHotMusic(songs); 
},function(error) {
    alert('获取歌曲失败');
});

function appendNewMusic(songs) {
    let docFragment = document.createDocumentFragment();
    for (let i = 0; i < songs.length; i++) {
        let song = songs[i].attributes;
        let songId = songs[i].id;
        let elLi = document.createElement('li');
        if (song.isNewMusic) {
            if (song.intro) {
                elLi.innerHTML = `
                    <a href="./song.html?id=${songId}" class="nm-link">
                        <div class="nm-intro">
                            <h3 class="nm-title single-ellipsis">
                                ${song.name}
                                <span>${song.intro}</span>
                            </h3>
                            <p class="nm-author single-ellipsis">
                                <svg class="icon icon-sq" aria-hidden="true">
                                    <use xlink:href="#icon-sq"></use>
                                </svg>
                                ${song.singer} - ${song.album}
                            </p>
                        </div>
                        <div class="nm-play">
                            <svg class="icon icon-play" aria-hidden="true">
                                <use xlink:href="#icon-play"></use>
                            </svg>
                        </div>
                    </a> 
                `;
                docFragment.appendChild(elLi);
            } else {
                elLi.innerHTML = `
                    <a href="./song.html?id=${songId}" class="nm-link">
                        <div class="nm-intro">
                            <h3 class="nm-title single-ellipsis">
                                ${song.name}
                            </h3>
                            <p class="nm-author single-ellipsis">
                                <svg class="icon icon-sq" aria-hidden="true">
                                    <use xlink:href="#icon-sq"></use>
                                </svg>
                                ${song.singer} - ${song.album}
                            </p>
                        </div>
                        <div class="nm-play">
                            <svg class="icon icon-play" aria-hidden="true">
                                <use xlink:href="#icon-play"></use>
                            </svg>
                        </div>
                    </a> 
                `;
                docFragment.appendChild(elLi);
            }
            elNmList.appendChild(docFragment);
        }
    }    
}

function appendHotMusic(songs) {
    let docFragment = document.createDocumentFragment();
    for (let i = 0; i < songs.length; i++) {
        let song = songs[i].attributes;
        let songId = songs[i].id;
        let elLi = document.createElement('li');
        if (song.isHotMusic) {
            if (song.intro) {
                elLi.innerHTML = `
                    <a href="./song.html?id=${songId}" class="hm-link">
                        <div class="hm-rank">${song.hotRank}</div>
                        <div class="hm-song">
                            <div class="hm-sintro">
                                <h3 class="hm-title single-ellipsis">
                                    ${song.name}
                                    <span>${song.intro}</span>
                                </h3>
                                <p class="hm-author single-ellipsis">
                                    <svg class="icon icon-sq" aria-hidden="true">
                                        <use xlink:href="#icon-sq"></use>
                                    </svg>
                                    ${song.singer} - ${song.album}
                                </p>
                            </div>
                            <div class="hm-play">
                                <svg class="icon icon-play" aria-hidden="true">
                                    <use xlink:href="#icon-play"></use>
                                </svg>
                            </div>
                        </div>
                    </a>
                `;
                docFragment.appendChild(elLi);
            } else {
                elLi.innerHTML = `
                    <a href="./song.html?id=${songId}" class="hm-link">
                        <div class="hm-rank">${song.hotRank}</div>
                        <div class="hm-song">
                            <div class="hm-sintro">
                                <h3 class="hm-title single-ellipsis">
                                    ${song.name}
                                </h3>
                                <p class="hm-author single-ellipsis">
                                    <svg class="icon icon-sq" aria-hidden="true">
                                        <use xlink:href="#icon-sq"></use>
                                    </svg>
                                    ${song.singer} - ${song.album}
                                </p>
                            </div>
                            <div class="hm-play">
                                <svg class="icon icon-play" aria-hidden="true">
                                    <use xlink:href="#icon-play"></use>
                                </svg>
                            </div>
                        </div>
                    </a>
                `;
                docFragment.appendChild(elLi);
            }
        }
        elHmList.appendChild(docFragment);
    }    
}