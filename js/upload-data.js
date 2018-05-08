//初始化
var APP_ID = 'Mugo8DRz0JB2wQoHCfKzI40v-gzGzoHsz';
var APP_KEY = 'vhMJxTzyQviG3EWuuW3QfPbN';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

/*
*** 向page recommend new music list添加数据内容 ***

//AV.Object.extend('className') 所需的参数 className 则表示对应的表名
//声明类型
var PageRecNmListObject = AV.Object.extend('PageRecNmList');

//新建对象
var song1 = new PageRecNmListObject();
var song2 = new PageRecNmListObject();
var song3 = new PageRecNmListObject();
var song4 = new PageRecNmListObject();
var song5 = new PageRecNmListObject();
var song6 = new PageRecNmListObject();
var song7 = new PageRecNmListObject();
var song8 = new PageRecNmListObject();
var song9 = new PageRecNmListObject();
var song10 = new PageRecNmListObject();

// 设置名称
song1.set('name','熙熙攘攘');
song1.set('intro','(电视剧《远大前程》兄弟主题曲)');
song1.set('singer','金志文');
song1.set('album','远大前程 电视原声带');
song1.set('url','http://p6v42xc4h.bkt.clouddn.com/%E7%86%99%E7%86%99%E6%94%98%E6%94%98.mp3');

song2.set('name','Ferris Wheel');
song2.set('singer','刘忻');
song2.set('album','Ferris Wheel');
song2.set('url','http://p6v42xc4h.bkt.clouddn.com/Ferris%20Wheel%20.mp3');

song3.set('name','渺小却伟大');
song3.set('singer','李易峰');
song3.set('album','渺小却伟大');
song3.set('url','http://p6v42xc4h.bkt.clouddn.com/%E6%B8%BA%E5%B0%8F%E5%8D%B4%E4%BC%9F%E5%A4%A7.mp3');

song4.set('name','不红的艺人');
song4.set('singer','谭佑铭');
song4.set('album','不红的艺人');
song4.set('url','http://p6v42xc4h.bkt.clouddn.com/%E4%B8%8D%E7%BA%A2%E7%9A%84%E8%89%BA%E4%BA%BA.mp3');

song5.set('name','半句再见');
song5.set('singer','孙燕姿');
song5.set('album','半句再见');
song5.set('url','http://p6v42xc4h.bkt.clouddn.com/%E5%8D%8A%E5%8F%A5%E5%86%8D%E8%A7%81.mp3');

song6.set('name','爱了很久的朋友');
song6.set('intro','(电影《后来的我们》插曲)');
song6.set('singer','田馥甄');
song6.set('album','爱了很久的朋友');
song6.set('url','http://p6v42xc4h.bkt.clouddn.com/%E7%88%B1%E4%BA%86%E5%BE%88%E4%B9%85%E7%9A%84%E6%9C%8B%E5%8F%8B.mp3');

song7.set('name','熊猫舞');
song7.set('singer','钟亚男');
song7.set('album','熊猫舞');
song7.set('url','http://p6v42xc4h.bkt.clouddn.com/%E7%86%8A%E7%8C%AB%E8%88%9E.mp3');

song8.set('name','小嫦娥');
song8.set('singer','安子与九妹');
song8.set('album','小嫦娥');
song8.set('url','http://p6v42xc4h.bkt.clouddn.com/%E5%B0%8F%E5%AB%A6%E5%A8%A5.mp3');

song9.set('name','Your Song');
song9.set('singer','Lady Gaga');
song9.set('album','Your Song');
song9.set('url','http://p6v42xc4h.bkt.clouddn.com/Your%20Song.mp3');

song10.set('name','My Star');
song10.set('singer','EXILE');
song10.set('album','My Star');
song10.set('url','http://p6v42xc4h.bkt.clouddn.com/My%20Star.mp3');

//构建一个本地的 AV.Object 对象数组
var songs = [song1,song2,song3,song4,song5,song6,song7,song8,song9,song10];

//批量创建（更新）
AV.Object.saveAll(songs).then(function(objects) {
    //成功
    console.log('ok');
}, function(error) {
    //异常处理
    console.log('error');
});
*/


/*
*** 向page hot music list添加数据内容 ***

//AV.Object.extend('className') 所需的参数 className 则表示对应的表名
//声明类型
var PageHotListObject = AV.Object.extend('PageHotList');

//新建对象
var song1 = new PageHotListObject();
var song2 = new PageHotListObject();
var song3 = new PageHotListObject();
var song4 = new PageHotListObject();
var song5 = new PageHotListObject();
var song6 = new PageHotListObject();
var song7 = new PageHotListObject();
var song8 = new PageHotListObject();
var song9 = new PageHotListObject();
var song10 = new PageHotListObject();
var song11 = new PageHotListObject();
var song12 = new PageHotListObject();
var song13 = new PageHotListObject();
var song14 = new PageHotListObject();
var song15 = new PageHotListObject();
var song16 = new PageHotListObject();
var song17 = new PageHotListObject();
var song18 = new PageHotListObject();
var song19 = new PageHotListObject();
var song20 = new PageHotListObject();

// 设置名称
song1.set('rank','01');
song1.set('name','离人愁');
song1.set('singer','李袁杰');
song1.set('album','离人愁');

song2.set('rank','02');
song2.set('name','爱了很久的朋友');
song2.set('intro','(电影《后来的我们》插曲)');
song2.set('singer','田馥甄');
song2.set('album','爱了很久的朋友');

song3.set('rank','03');
song3.set('name','你，好不好？');
song3.set('intro','(电视剧《遗憾拼图》片尾曲)');
song3.set('singer','周兴哲');
song3.set('album','爱，教会我们的事');

song4.set('rank','04');
song4.set('name','白羊');
song4.set('singer','徐秉龙 / 沈以诚');
song4.set('album','白羊');

song5.set('rank','05');
song5.set('name','戒烟 (Live)');
song5.set('singer','李荣浩 / 陈立农 / 尤长靖 / 灵超 / 朱正廷 / 陆定昊 / 木子洋 / 杨非同');
song5.set('album','偶像练习生 表演曲目合集');

song6.set('rank','06');
song6.set('name','最美的期待');
song6.set('singer','周笔畅');
song6.set('album','最美的期待');

song7.set('rank','07');
song7.set('name','空空如也');
song7.set('singer','任然');
song7.set('album','空空如也');

song8.set('rank','08');
song8.set('name','渺小却伟大');
song8.set('singer','李易峰');
song8.set('album','渺小却伟大');

song9.set('rank','09');
song9.set('name','慢慢喜欢你');
song9.set('singer','莫文蔚');
song9.set('album','慢慢喜欢你');

song10.set('rank','10');
song10.set('name','醉赤壁');
song10.set('intro','(网游《赤壁Online》主题曲)');
song10.set('singer','林俊杰');
song10.set('album','JJ陆');

song11.set('rank','11');
song11.set('name','纸短情长（完整版）');
song11.set('singer','烟把儿');
song11.set('album','纸短情长（完整版）');

song12.set('rank','12');
song12.set('name','PLANET');
song12.set('singer','ラムジ');
song12.set('album','PLANET');

song13.set('rank','13');
song13.set('name','烟火里的尘埃');
song13.set('singer','华晨宇');
song13.set('album','烟火里的尘埃');

song14.set('rank','14');
song14.set('name','说散就散');
song14.set('intro','(电影《前任3：再见前任》主题曲)');
song14.set('singer','袁娅维');
song14.set('album','说散就散');

song15.set('rank','15');
song15.set('name','Something Just Like This');
song15.set('singer','The Chainsmokers / Coldplay');
song15.set('album','Something Just Like This');

song16.set('rank','16');
song16.set('name','男孩');
song16.set('singer','梁博 / 陶孟童 / 肖和东 / 高誉容');
song16.set('album','我想和你唱 第二季 第7期');

song17.set('rank','17');
song17.set('name','红昭愿');
song17.set('singer','音阙诗听');
song17.set('album','红昭愿');

song18.set('rank','18');
song18.set('name','BINGBIAN病变');
song18.set('singer','Cubi / Aydo$ / BRGang');
song18.set('album','BINGBIAN病变');

song19.set('rank','19');
song19.set('name','广东十年爱情故事');
song19.set('singer','广东雨神');
song19.set('album','广东十年爱情故事');

song20.set('rank','20');
song20.set('name','追光者');
song20.set('intro','(电视剧《夏至未至》插曲)');
song20.set('singer','岑宁儿');
song20.set('album','夏至未至 影视原声带');

//构建一个本地的 AV.Object 对象数组
var songs = [song1,song2,song3,song4,song5,song6,song7,song8,song9,song10,song11,song12,song13,song14,song15,song16,song17,song18,song19,song20];

//批量创建（更新）
AV.Object.saveAll(songs).then(function(objects) {
    //成功
    console.log('ok');
}, function(error) {
    //异常处理
    console.log('error');
});
*/


/*
*** 向page playlist song list添加数据内容 ***

//AV.Object.extend('className') 所需的参数 className 则表示对应的表名
//声明类型
var PagePlListObject = AV.Object.extend('PagePlList');

//新建对象
var plSong1 = new PagePlListObject();
var plSong2 = new PagePlListObject();
var plSong3 = new PagePlListObject();
var plSong4 = new PagePlListObject();
var plSong5 = new PagePlListObject();
var plSong6 = new PagePlListObject();
var plSong7 = new PagePlListObject();
var plSong8 = new PagePlListObject();
var plSong9 = new PagePlListObject();
var plSong10 = new PagePlListObject();
var plSong11 = new PagePlListObject();
var plSong12 = new PagePlListObject();
var plSong13 = new PagePlListObject();
var plSong14 = new PagePlListObject();
var plSong15 = new PagePlListObject();
var plSong16 = new PagePlListObject();
var plSong17 = new PagePlListObject();
var plSong18 = new PagePlListObject();
var plSong19 = new PagePlListObject();
var plSong20= new PagePlListObject();

// 设置名称
plSong1.set('name','Can\'t Breathe');
plSong1.set('singer','Eddie Supa / 王嘉尔 / Stan Sono');
plSong1.set('rank','01');
plSong1.set('album','VIBE Presents Urban Asia Vol 1');

plSong2.set('name','面包与海');
plSong2.set('singer','柳爽');
plSong2.set('rank','02');
plSong2.set('album','面包与海');

plSong3.set('name','舞舞舞(都市练爱剧《动物系恋人啊》片头曲)');
plSong3.set('singer','萧亚轩');
plSong3.set('rank','03');
plSong3.set('album','舞舞舞');

plSong4.set('name','我们的爱没有错(电视剧《泡沫之夏》主题曲)');
plSong4.set('singer','胡夏');
plSong4.set('rank','04');
plSong4.set('album','泡沫之夏 电视原声带');

plSong5.set('name','第三人称(电视剧《北京女子图鉴》插曲)');
plSong5.set('singer','戚薇');
plSong5.set('rank','05');
plSong5.set('album','第三人称');

plSong6.set('name','转折');
plSong6.set('singer','梁文音');
plSong6.set('rank','06');
plSong6.set('album','转折');

plSong7.set('name','Chasing You (Prod. by Yoken)');
plSong7.set('singer','Mc光光 / Yoken_Official / 阿曼');
plSong7.set('rank','07');
plSong7.set('album','街躁日Street Noise Vol.2');

plSong8.set('name','当我们不在一起');
plSong8.set('singer','四分卫');
plSong8.set('rank','08');
plSong8.set('album','当我们不在一起');

plSong9.set('name','积雨云(第三十五届政大金旋奖主题曲 / Rain Clouds)');
plSong9.set('singer','郑兴');
plSong9.set('rank','09');
plSong9.set('album','积雨云');

plSong10.set('name','洛杉矶的十点半(电视剧《忽而今夏》章远人物曲)');
plSong10.set('singer','白宇');
plSong10.set('rank','10');
plSong10.set('album','洛杉矶的十点半');

plSong11.set('name','heart');
plSong11.set('singer','李迦南Doc');
plSong11.set('rank','11');
plSong11.set('album','heart');

plSong12.set('name','后来的我们(电影《后来的我们》片名曲)');
plSong12.set('singer','五月天');
plSong12.set('rank','12');
plSong12.set('album','后来的我们');

plSong13.set('name','她很漂亮(电视剧《她很漂亮》同名主题曲)');
plSong13.set('singer','任家萱');
plSong13.set('rank','13');
plSong13.set('album','她很漂亮');

plSong14.set('name','诗');
plSong14.set('singer','Winky诗 / 三无MarBlue');
plSong14.set('rank','14');
plSong14.set('album','溯游从歌');

plSong15.set('name','光尘(Light and Dust)');
plSong15.set('singer','Hello Nico');
plSong15.set('rank','15');
plSong15.set('album','光尘');

plSong16.set('name','境迁(独唱版)');
plSong16.set('singer','王心凌');
plSong16.set('rank','16');
plSong16.set('album','境迁(独唱版)');

plSong17.set('name','别');
plSong17.set('singer','白举纲');
plSong17.set('rank','17');
plSong17.set('album','赤');

plSong18.set('name','莽荒(电视剧《莽荒纪》片头曲)');
plSong18.set('singer','金志文');
plSong18.set('rank','18');
plSong18.set('album','莽荒');

plSong19.set('name','淘金日记');
plSong19.set('singer','C-BLOCK');
plSong19.set('rank','19');
plSong19.set('album','淘金日记');

plSong20.set('name','染');
plSong20.set('singer','张碧晨');
plSong20.set('rank','20');
plSong20.set('album','染');

//构建一个本地的 AV.Object 对象数组
var plSongs = [plSong1,plSong2,plSong3,plSong4,plSong5,plSong6,plSong7,plSong8,plSong9,plSong10,plSong11,plSong12,plSong13,plSong14,plSong15,plSong16,plSong17,plSong18,plSong19,plSong20];

//批量创建（更新）
AV.Object.saveAll(plSongs).then(function(objects) {
    //成功
    console.log('ok');
}, function(error) {
    //异常处理
    console.log('error');
});
*/