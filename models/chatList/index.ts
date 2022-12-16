import { Schema,model } from "mongoose";
// 好友关系是无向图的关系
export interface ChatListType {
    _id: Schema.Types.ObjectId;
    from: string; // 发起的用户
    to: string; // 被添加的好友
    waitTime: number; // 发起好友申请的时间
    agreeTime: number; // 成为好友的时间
    status: 'wait' | 'agree' | 'reject'; // wait: 发起好友请求  agree: 同意好友
}
const schema = new Schema<ChatListType>({
    from: {type: String, required: true},
    to: {type: String, required: true},
    waitTime: {type: Number, required: true},
    agreeTime: {type: Number, required: true},
    status: {type: String, required: true},
});
const ChatList = model<ChatListType>('ChatList', schema);
export default ChatList;