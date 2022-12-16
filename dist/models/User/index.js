"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    headPorUrl: {
        type: String,
        default: 'default.jpg'
    },
    signatrue: {
        type: String,
        default: ''
    },
    location: String
});
const User = (0, mongoose_1.model)('User', schema);
exports.default = User;
//# sourceMappingURL=index.js.map