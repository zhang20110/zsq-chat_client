import React, { useLayoutEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Style from './index.module.css';

export default function Footer() {
    const wrapRef = useRef(null);
    const location = useLocation();
    useLayoutEffect(() => {
        for (let i=0; i<wrapRef.current.children.length; ++i) {
            const ele = wrapRef.current.children[i];
            if (ele.href.indexOf(location.pathname) !== -1){
                ele.classList.add(Style.active);
            } else {
                ele.classList.remove(Style.active);
            }
        }
    }, [location]);
    return (
        <div ref={wrapRef} className={Style.footer}>
            <Link className={Style.link} to="/chat">消息</Link>
            <Link className={Style.link} to="/address_list">联系人</Link>
            <Link className={Style.link} to="/user">我的</Link>
        </div>
    )
}