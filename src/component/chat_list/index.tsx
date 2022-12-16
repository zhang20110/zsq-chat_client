import React, { useEffect, useState } from "react"
import styles from "./index.module.css"
import List from './list/index'
import Header from "../header"
import Footer from "../footer"
import Http from "../../http"
import { getItem } from "../../localStorage"
export default function Chatlist() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const ids = getItem('users');
        const { promise, cancel } = Http('post', 'getAllUsers', { ids });
        promise.then(res => {
            setData(res.data.data);
        }).catch(err => {
            console.log('chat_list err: ', err);
        })
        return cancel;
    }, []);
    return (
        <div className={styles.main}>
            <Header title="消息"/>
            <div className={styles.section}>
            { 
                data.map(v => <List {...v}/>)
            }
            </div>
            <Footer></Footer>
        </div>
    )
}