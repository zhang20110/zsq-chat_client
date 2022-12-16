import { Schema,model } from "mongoose";
export interface MessageType {
    _id: Schema.Types.ObjectId;
    from: string;
    to: string;
    msg: string;
    time: number;
    type: 'text' | 'img' | 'math' | 'code' | 'radio' | 'vedio' | 'emoji';
    status: 'unread' | 'read'; // 记录是否已读
}
const schema = new Schema<MessageType>({
    from: {type: String, required: true},
    to: {type: String, required: true},
    msg: {type: String, required: true},
    time: {type: Number, required: true},
    type: {type: String, required: true},
    status: {type: String, required: true},
});
const Message = model<MessageType>('Message', schema);
export default Message;