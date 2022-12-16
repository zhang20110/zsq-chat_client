"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    type: { type: String, require: true },
    unicode: { type: Number, require: true },
});
const Emoji = (0, mongoose_1.model)('emoji', schema);
exports.default = Emoji;
//# sourceMappingURL=index.js.map