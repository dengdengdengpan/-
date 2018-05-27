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
                    <a href="./song.html?id=${songId}" class="song-link">
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
                    <a href="./song.html?id=${songId}" class="song-link">
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
                            <div class="hm-play flex-center">
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
                            <div class="hm-play flex-center">
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
let deleteBtn = document.querySelector('.page-search .delete-icon');
let hotSearch = document.querySelector('.page-search .hot-search');
let searchResult = document.querySelector('.page-search .search-result');
let srTarget = searchResult.querySelector('.sr-target');
let srList = searchResult.querySelector('.sr-list');
let noResult =searchResult.querySelector('.no-result');
let searchSong = document.querySelector('.search-song');
let timer = null;
let searchHistory = document.querySelector('.search-history');
let shList = document.querySelector('.page-search .sh-list');

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
    searchHistory.classList.remove('active');
});



function switchVal(value) {
    // 对input是否有值展示不同的UI界面
    if (value) {
        deleteBtn.classList.add('active');
        hotSearch.classList.add('active');
        searchHistory.classList.add('active');
        searchResult.classList.add('active');
        srTarget.textContent = `“${value}”`;
    } else {
        deleteBtn.classList.remove('active');
        searchResult.classList.remove('active');
        hotSearch.classList.remove('active');
        searchHistory.classList.remove('active');
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
            setSearchRecord(this,value);
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
        if (song.intro) {
            elLi.innerHTML = `
                <a href="./song.html?id=${songId}" class="song-link">
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
                <a href="./song.html?id=${songId}" class="song-link">
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
    setSearchRecord(this,value);
});


// search record
var recordTime;
var recordItem;

// 初始化localStorage的搜索记录
function initSearchRecord() {
    // 初始化记录时间、记录项为空数组
    recordTime = [];
    recordItem = [];
    // 遍历localStorage
    for (let i = 0; i < localStorage.length; i++) {
        // localStorage中存储的搜索记录是以时间为键名，筛选掉localStorage中不是数字的键名
        if (!isNaN(localStorage.key(i))) {
            recordTime.push(localStorage.key(i));
        }
    }
    // 当recordTime不是空数组，遍历recordTime向recordItem添加记录
    if (recordTime.length > 0) {
        // 把记录时间按照由大到小的顺序排列，即最先储存的记录在最后
        recordTime.sort(compareFun);
        for (let i = 0; i < recordTime.length; i++) {
            recordItem.push(localStorage.getItem(recordTime[i]));
        }
    }
    shList.innerHTML = '';
    generateRecordTemplet();
}

// 比较函数，从大到小
function compareFun(a,b) {
    if (a < b) {
        return 1;
    } else if (a > b) {
        return -1;
    } else {
        return 0;
    }
}

// 生成搜索记录模板
function generateRecordTemplet() {
    let docFragment = document.createDocumentFragment();
    for (let i = 0; i < recordItem.length; i++) {
        let elLi = document.createElement('li');
        elLi.setAttribute('class','sh-item');
        elLi.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" class="sh-icon">
                <path fill-rule="evenodd" fill="#c9caca" d="m15 30c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15m0-28c-7.18 0-13 5.82-13 13s5.82 13 13 13 13-5.82 13-13-5.82-13-13-13m7 16h-8c-.552 0-1-.447-1-1v-10c0-.553.448-1 1-1s1 .447 1 1v9h7c.553 0 1 .447 1 1s-.447 1-1 1"/>
            </svg>
            <div class="sh-rpart border-bottom">
                <p class="sh-text">${recordItem[i]}</p>
                <div class="close-wrap">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="close-icon">
                        <path fill-rule="evenodd" fill="#999899" d="m13.379 12l10.338 10.337c.381.381.381.998 0 1.379s-.998.381-1.378 0l-10.338-10.338-10.338 10.338c-.38.381-.997.381-1.378 0s-.381-.998 0-1.379l10.338-10.337-10.338-10.338c-.381-.38-.381-.997 0-1.378s.998-.381 1.378 0l10.338 10.338 10.338-10.338c.38-.381.997-.381 1.378 0s.381.998 0 1.378l-10.338 10.338"/>
                    </svg>
                </div>
            </div>
        `;
        let value = `${recordItem[i]}`;
        elLi.addEventListener('click',function() {
            search.value = value;
            hotSearch.classList.add('active');
            searchHistory.classList.add('active');
            searchSong.innerHTML = '';
            searchSong.classList.add('active');
            querySearch(value).then(appendSearchSong);
        });
        docFragment.appendChild(elLi);
    }
    shList.appendChild(docFragment);
}

// 当点击搜索结果中的.sr-title或.sr-item时储存记录
function setSearchRecord(domElement,value) {
    // 设置储存记录的时间
    let time = (new Date()).getTime();
    this.addEventListener('click',function() {
        if (recordItem.indexOf(value) >= 0) {
            // 搜索记录已经存在的情况，找到之前在localStorage中储存的该项，然后移除该项；然后设置当前这个新的时间点的记录到localStorage中
            for (let i = 0; i < localStorage.length; i++) {
                if (value === localStorage.getItem(localStorage.key(i))) {
                    localStorage.removeItem(localStorage.key(i));
                }
            }
            localStorage.setItem(time,value);
        } else {
            if (recordItem.length > 3) {
                let lastRecordItem = recordTime[recordTime.length - 1];
                localStorage.removeItem(lastRecordItem);
                localStorage.setItem(time,value);
            } else {
                localStorage.setItem(time,value);
            }
        }
        initSearchRecord();
    });
}

initSearchRecord();

let closeWrap = document.getElementsByClassName('close-wrap');
let shItems = shList.getElementsByClassName('sh-item');
for (let i = 0; i < closeWrap.length; i++) {
    closeWrap[i].addEventListener('click',function(event) {
        event.stopPropagation();
        let currentShItem = this.parentElement.parentElement;
        let currentIndex = [].indexOf.call(shItems,currentShItem);
        localStorage.removeItem(recordTime[currentIndex]);
        currentShItem.remove();
    });
}