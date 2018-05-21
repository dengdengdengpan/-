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
        elLi.setAttribute('class','border-bottom');
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
                        <div class="hm-song border-bottom">
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
                        <div class="hm-song border-bottom">
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

// search
let search = document.querySelector('.page-search .search');
let deleteBtn = document.querySelector('.page-search .icon-delete');
let hotSearch = document.querySelector('.page-search .hot-search');
let searchResult = document.querySelector('.page-search .search-result');
let srTarget = searchResult.querySelector('.sr-target');
let srList = searchResult.querySelector('.sr-list');
let noResult =searchResult.querySelector('.no-result');
let searchSong = document.querySelector('.search-song');
let timer = null;

search.addEventListener('focus',function() {
    searchSong.classList.remove('active');
    let value = search.value;
    switchVal(value);
    if (value) {
        querySearch(value).then(generateSearchResult);
    }
});

search.addEventListener('input',function(event) {
    let inputVal = event.currentTarget.value;
    // 函数节流
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(function() {
        timer = null;
        let value = inputVal.trim();
        switchVal(value);

        // value 如果为空字符串则退出
        if (value === '') {
            return;
        }

        querySearch(value).then(generateSearchResult);
    },500);
});

deleteBtn.addEventListener('click',function() {
    search.value = '';
    deleteBtn.classList.remove('active');
    searchResult.classList.remove('active');
    searchSong.classList.remove('active');
    hotSearch.classList.remove('active');
});



function switchVal(value) {
    // 对input是否有值展示不同的UI界面
    if (value) {
        deleteBtn.classList.add('active');
        hotSearch.classList.add('active');
        searchResult.classList.add('active');
        srTarget.textContent = `“${value}”`;
    } else {
        deleteBtn.classList.remove('active');
        searchResult.classList.remove('active');
        hotSearch.classList.remove('active');
    }
}

function querySearch(value) {
    // 组合查询SongList
    let queryName = new AV.Query('SongList');
    queryName.contains('name', value);
    let querySinger = new AV.Query('SongList');
    querySinger.contains('singer',value);
    let queryAlbum = new AV.Query('SongList');
    queryAlbum.contains('album',value);
    let querySearch = AV.Query.or(queryName, querySinger,queryAlbum);
    return querySearch.find();
}

function generateSearchResult(songs) {
    srList.innerHTML = '';
    if (songs.length === 0) {
        noResult.classList.add('active');
    } else {
        noResult.classList.remove('active');
        appendSearchItem(songs);
    }
}

function appendSearchItem(songs) {
    let docFragment = document.createDocumentFragment();
    for (let i = 0; i < songs.length; i++) {
        let song = songs[i].attributes;
        let elLi = document.createElement('li');
        elLi.setAttribute('class','sr-item');
        elLi.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" class="sr-icon">
                <path fill-rule="evenodd" fill="#c9c9ca" d="M25.181,23.535l-1.414,1.414l-7.315-7.314   C14.709,19.107,12.46,20,10,20C4.477,20,0,15.523,0,10C0,4.477,4.477,0,10,0c5.523,0,10,4.477,10,10c0,2.342-0.811,4.49-2.16,6.195   L25.181,23.535z M10,2c-4.418,0-8,3.582-8,8s3.582,8,8,8c4.418,0,8-3.582,8-8S14.418,2,10,2z"/>
            </svg>
            <p class="sr-text border-bottom">${song.name}</p>
        `;
        elLi.addEventListener('click',function() {
            searchResult.classList.remove('active');
            searchSong.innerHTML = '';
            searchSong.classList.add('active');
            let value = `${song.name}`;
            querySearch(value).then(appendSearchSong);
        });
        docFragment.appendChild(elLi);
    }
    srList.appendChild(docFragment);
}

function appendSearchSong(songs) {
    let docFragment = document.createDocumentFragment();
    for (let i = 0; i < songs.length; i++) {
        let song = songs[i].attributes;
        let songId = songs[i].id;
        let elLi = document.createElement('li');
        elLi.setAttribute('class','border-bottom');
        if (song.isNewMusic) {
            if (song.intro) {
                elLi.innerHTML = `
                    <a href="./song.html?id=${songId}" class="nm-link">
                        <div class="song-intro">
                            <h3 class="song-title single-ellipsis">
                                ${song.name}
                                <span>${song.intro}</span>
                            </h3>
                            <p class="song-author single-ellipsis">
                                <svg class="icon icon-sq" aria-hidden="true">
                                    <use xlink:href="#icon-sq"></use>
                                </svg>
                                ${song.singer} - ${song.album}
                            </p>
                        </div>
                        <div class="song-play">
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
                        <div class="song-intro">
                            <h3 class="song-title single-ellipsis">
                                ${song.name}
                            </h3>
                            <p class="song-author single-ellipsis">
                                <svg class="icon icon-sq" aria-hidden="true">
                                    <use xlink:href="#icon-sq"></use>
                                </svg>
                                ${song.singer} - ${song.album}
                            </p>
                        </div>
                        <div class="song-play">
                            <svg class="icon icon-play" aria-hidden="true">
                                <use xlink:href="#icon-play"></use>
                            </svg>
                        </div>
                    </a> 
                `;
                docFragment.appendChild(elLi);
            }
            searchSong.appendChild(docFragment);
        }
    }    
}

let srTitle = document.querySelector('.sr-title');
srTitle.addEventListener('click',function() {
    searchResult.classList.remove('active');
    searchSong.innerHTML = '';
    searchSong.classList.add('active');
    
    let value = search.value;
    let queryName = new AV.Query('SongList');
    let querySinger = new AV.Query('SongList');
    let queryAlbum = new AV.Query('SongList');
    let xxx = new RegExp(value,'i');
    queryName.matches('name', xxx);
    querySinger.matches('name', xxx);
    queryAlbum.matches('name', xxx);
    let querySrTitle = AV.Query.or(queryName, querySinger,queryAlbum);
    querySrTitle.find().then(appendSearchSong);
});