//初始化
var APP_ID = 'Mugo8DRz0JB2wQoHCfKzI40v-gzGzoHsz';
var APP_KEY = 'vhMJxTzyQviG3EWuuW3QfPbN';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

//批量查询
let queryPl = new AV.Query('PagePlList');
queryPl.find().then(function(plSongs) {
    for (let i = 0; i < plSongs.length; i++) {
        console.log(plSongs[i].attributes);
    }
},function(error) {
    alert('获取新歌曲失败');
});