"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
async function getSelfInfo(ctx, next) {
    const { id } = ctx.state.user;
    const data = await User_1.default.findById(id, { _id: 0, name: 1, headPorUrl: 1, signatrue: 1, location: 1 }, { lean: true });
    ctx.status = 200;
    ctx.body = data;
    console.log('getSelfInfo: ', data);
    await next();
}
exports.default = getSelfInfo;
//# sourceMappingURL=index.js.map