"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const images_1 = __importDefault(require("images"));
async function uploadImg(file, width) {
    const readStream = fs_1.default.createReadStream(file.filepath);
    const name = file.newFilename + '.jpg'; // 全部转换成jpg
    const myPath = path_1.default.normalize(process.cwd() + '/static/imgs/' + name);
    const writeStream = fs_1.default.createWriteStream(myPath);
    readStream.pipe(writeStream);
    return new Promise((resolve, reject) => {
        writeStream.on('finish', () => {
            // 压缩图片 image仅支持jpg输出的压缩
            // 测试显示 png也支持  不过效果没有jpg好
            const compressName = 'compress-' + name;
            const outPath = path_1.default.normalize(process.cwd() + '/static/imgs/' + compressName);
            (0, images_1.default)(myPath)
                .size(width || 200) // 缩小图片可以达到压缩几十倍的效果
                .save(outPath, {
                operation: 10
            });
            return resolve(compressName);
        });
    });
}
exports.default = uploadImg;
//# sourceMappingURL=index.js.map