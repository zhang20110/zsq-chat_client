"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    waitTime: { type: Number, required: true },
    agreeTime: { type: Number, required: true },
    status: { type: String, required: true },
});
const ChatList = (0, mongoose_1.model)('ChatList', schema);
exports.default = ChatList;
//# sourceMappingURL=index.js.map