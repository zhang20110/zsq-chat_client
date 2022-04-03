import React from "react";
import { Link } from "react-router-dom";
import Style from './index.module.css';

export default function Footer() {
    return (
        <div className={Style.footer}>
            <Link className={Style.link} to="/chat">消息</Link>
            <Link className={Style.link} to="/address_list">联系人</Link>
            <Link className={Style.link} to="/user">我的</Link>
        </div>
    )
}