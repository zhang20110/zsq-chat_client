import mongoose from 'mongoose'
export default function mongo(){
    const url = 'mongodb://localhost:27017/graduation'
    return mongoose.connect(url, {})
    .then(() => {
        console.log('数据库连接成功');
    }).catch(err => {
        console.log('数据库连接失败', err);
    })
}