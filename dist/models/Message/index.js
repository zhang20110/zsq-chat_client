"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    msg: { type: String, required: true },
    time: { type: Number, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
});
const Message = (0, mongoose_1.model)('Message', schema);
exports.default = Message;
//# sourceMappingURL=index.js.map