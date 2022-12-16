import { Schema,model } from "mongoose";
interface User {
    _id: Schema.Types.ObjectId;
    name: string;
    password: string;
    headPorUrl: string;
    signatrue: string; 
    location: string; 
}
const schema = new Schema<User>({
    name: {type: String, required: true},
    password: {type: String, required: true},
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
const User = model<User>('User', schema);
export default User;