import React from "react"
import Style from './index.module.css'
import { Outlet } from 'react-router-dom'
import Footer from "../footer"
function Main(props) {
    return (
        <div id={Style.main}>
            <Outlet />
            {/* <div className={Style.footer}>
                <Link className={Style.link} to="chat">消息</Link>
                <Link className={Style.link} to="address_list">联系人</Link>
                <Link className={Style.link} to="user">我的</Link>
            </div> */}
        </div>
    )
}
export default Main