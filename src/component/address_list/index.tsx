import React, { useEffect, useState } from "react";
import Http from "../../http";
import Footer from "../footer";
import Header from "../header";
import AddressItem from "./AddressItem";
import styles from './index.module.css'

export default function AddressList() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const {promise, cancel} = Http('get', '/chatlist');
        promise.then(res => {
            setData(res.data)
        }).catch(err => {
            console.log('chatlist err: ', err);
        })
        return cancel;
    }, []);
    return (
        <div className={styles.wrap}>
            <Header title="联系人"/>
            <div className={styles.section}>
                {
                    data.map(v => <AddressItem {...v}/>)
                }
            </div>
            <Footer/>
        </div>
    )
}