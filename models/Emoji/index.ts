import { Schema,model } from "mongoose";
export interface EmojiType {
    type: string;
    unicode: number; // 十进制
}
const schema = new Schema<EmojiType>({
    type: {type: String, require: true},
    unicode: {type: Number, require: true},
});
const Emoji = model<EmojiType>('emoji', schema);
export default Emoji;
