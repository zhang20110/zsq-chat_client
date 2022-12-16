import React, { useCallback, useEffect, useState } from "react";
import Http from "../../http";
import Footer from "../footer";
import Header from "./header";
import styles from "./index.module.css"
import Item from "./item";

export default function User() {
    const [data, setData] = useState({});
    // 获取用户基本信息
    useEffect(() => {
        const {promise, cancel} = Http('get', 'getSelfInfo');
        promise.then(res => {
            setData(res.data);
        }).catch(err => {
            console.log('user err: ', err.response);
        })
        return cancel;
    }, []);
    const updateUserInfo = useCallback((data: {}) => {
        const {promise} = Http('post', 'updateUserInfo', data);
        promise.then(res => {
            setData(res.data);
        }).catch(err => {
            console.log('user updateUserInfo err: ', err);
            alert(err.response.data.msg);
        })
    }, []);
    return (
        <div className={styles.wrap}>
            <Header {...data} updateUserInfo={updateUserInfo} updateData={(data) => 
                setData(pre => ({...pre, ...data}))}/>
            <div className={styles.section}>
                <Item title="添加好友" href="sendFriReq" icon="icon-wodehaoyou"/>
                <Item title="好友申请" href="sendFriReply" icon="icon-jiahaoyou"/>
                <Item title="新朋友" href="newFriend" icon="icon-xinpengyou"/>
            </div>
            <Footer />
        </div>
    )
}