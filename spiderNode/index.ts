/**
 * node爬虫 爬出网站http://emojixd.com/group/smileys-emotion的emoji表情
 * 存入数据库
 * 原理：cheerio实现node端仿jquery解析html的dom
 * 参考：https://cloud.tencent.com/developer/article/1808519
 */ 
import cheerio from 'cheerio';
import http from 'http';
import mongo from '../db';
import Emoji from '../models/Emoji';
http.get('http://emojixd.com/group/smileys-emotion', res => {
    let html = '';
    console.log('html连接成功');
    res.on('data', data =>{
        html += data;
    })
    res.on('end', () => {
        const $ = cheerio.load(html);
        const wraps = $('.clearfix');
        const res: ({type: string, unicode: number})[] = [];
        wraps.each(function() {
            const title = $('h3[class="h3 center pt4 mb2"]', this).text();
            const pos = title.indexOf("表情") === -1 ? 100 : title.indexOf("表情");
            const type = title.slice(0, pos);
            const emoji = $('div[class="emoji left mr2 h1"]', this);
            console.log(type);
            emoji.each(function(){
                // 获取emoji的unicode编码
                const unicode = $(this).text().codePointAt(0); 
                res.push({type, unicode});
            })
        })
        console.log(res.length, res[0]);
        mongo().then(() => {
            Emoji.collection.insertMany(res).then(() => {
                console.log('数据保存成功');
            });
        })
    })
})