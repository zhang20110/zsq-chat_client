import React from "react";
import { Route } from 'react-router'
import { BrowserRouter, Routes } from 'react-router-dom'
import ChatList from "../chat_list/index";
import Main from '../main/index'
import Chat from "../chat";
import AddressList from "../address_list";
import User from "../user";
export default (function () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}>
                    <Route index element={<ChatList/>} />
                    <Route path="chat" element={<ChatList/>} />
                    <Route path="address_list" element={<AddressList/>}/>
                    <Route path="user" element={<User/> }/>
                    <Route path="chat/:id" element={<Chat/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
})