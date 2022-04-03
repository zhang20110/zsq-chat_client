import React from "react";
import Footer from "../footer";
import Header from "./header";
import styles from "./index.module.css"
import Item from "./item";

export default function User() {
    const headPortrait = "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96f0a05789384c07afc8a5eed9b7bffc~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?";
    const name = '毛泽东';
    const address = '南京市, 江苏省';
    const state = '精进的要义是不急而速';
    const data = {headPortrait, name, address, state};
    return (
        <div className={styles.wrap}>
            <Header {...data}/>
            <div className={styles.section}>
                <Item title="设置" href="setting"/>
                <Item title="设置" href="setting"/>
                <Item title="设置" href="setting"/>
            </div>
            <Footer />
        </div>
    )
}