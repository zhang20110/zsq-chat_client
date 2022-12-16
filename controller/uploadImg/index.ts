import fs from 'fs';
import path from 'path';
import images from 'images'
export default async function uploadImg(file: any, width?: number) {
    const readStream = fs.createReadStream(file.filepath);
    const name = file.newFilename + '.jpg'; // 全部转换成jpg
    const myPath = path.normalize(process.cwd() + '/static/imgs/' + name);
    const writeStream = fs.createWriteStream(myPath);
    readStream.pipe(writeStream);
    return new Promise((resolve, reject) => {
        writeStream.on('finish', () => {
            // 压缩图片 image仅支持jpg输出的压缩
            // 测试显示 png也支持  不过效果没有jpg好
            const compressName = 'compress-' + name;
            const outPath = path.normalize(process.cwd() 
            + '/static/imgs/' + compressName);
            images(myPath)
                .size(width || 200) // 缩小图片可以达到压缩几十倍的效果
                .save(outPath, {
                    operation: 10
                });
            return resolve(compressName);
        });
    })
}