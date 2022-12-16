"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function mongo() {
    const url = 'mongodb://localhost:27017/graduation';
    return mongoose_1.default.connect(url, {})
        .then(() => {
        console.log('数据库连接成功');
    }).catch(err => {
        console.log('数据库连接失败', err);
    });
}
exports.default = mongo;
//# sourceMappingURL=index.js.map