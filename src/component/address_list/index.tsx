import React from "react";
import Footer from "../footer";
import Header from "../header";
import AddressItem from "./AddressItem";
import styles from './index.module.css'

export default function AddressList() {
    const address  = "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96f0a05789384c07afc8a5eed9b7bffc~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?"
    return (
        <div className={styles.wrap}>
            <Header title="联系人"/>
            <div className={styles.section}>
                <AddressItem address={address} name="毛泽东"/>
                <AddressItem address={address} name="毛泽东"/>
                <AddressItem address={address} name="毛泽东"/>
            </div>
            <Footer/>
        </div>
    )
}