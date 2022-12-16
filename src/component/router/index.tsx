import React from "react";
import { Route } from 'react-router'
import { BrowserRouter, Routes } from 'react-router-dom'
import ChatList from "../chat_list/index";
import Main from '../main/index'
import Chat from "../chat";
import AddressList from "../address_list";
import User from "../user";
import Login from "../Login";
import Register from "../register";
import SendFriSep from "../sendFriSeq";
import SendFriReply from "../sendFriReply";
import NewFriend from "../newFriend";
export default (function () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}>
                    <Route index element={<Login/>}/>
                    <Route path="login" element={<Login/>} />
                    <Route path="register" element={<Register/>} />
                    <Route path="chat" element={<ChatList/>} />
                    <Route path="address_list" element={<AddressList/>}/>
                    <Route path="user" element={<User/> }/>
                    <Route path="user/sendFriReq" element={<SendFriSep/> }/>
                    <Route path="user/sendFriReply" element={<SendFriReply/> }/>
                    <Route path="user/newFriend" element={<NewFriend/> }/>
                    <Route path="chat/:id" element={<Chat/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
})