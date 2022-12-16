import React, { useState } from "react";
import Http from "../../http";
import Header from "../header";
import Input from "./input";
import Item from "./Item";
import styles from './index.module.css'
import wss from '../../webSocket'

export default function SendFriSep() {
    const [data, setData] = useState(null);
    const enterHandle = async (name: string) => {
        if (!name) {
            alert("用户名不能为空");
            setData(null);
            return;
        }
        const { promise } = Http("post", '/getUser', { name });
        const { data: {data: res} } = await promise;
        if (res && Object.keys(res).length) {
            const { user } = res;
            
            let friend = Boolean(res.from || res.to || res.isSelf);
            let handle = "等待验证", noHandle = "请求好友";
            if (friend) {
                if (res.from === 'reject' || res.to === 'reject') {
                    friend = false;
                } else if (res.from === 'wait') {
                    handle = '等待对方同意';
                } else if (res.to === 'wait') {
                    handle = "等待你验证"
                } else if (res.from === 'agree' || res.to === 'agree' || res.isSelf) {
                    handle = '已经是好友';
                }
            }
            setData({ handle, noHandle, friend, name, ...user });
        } else {
            setData({});
        }
    };
    const btnClick = () => {
        wss.send({
            mesType: 'sendFriReq',
            to: data._id,
        });
        wss.emit((data) => {
            if (data.mesType === 'sendFriReq') {
                if (data && Object.keys(data).length) {
                    setData(pre => ({...pre, friend: true}));
                    alert('发送成功');
                }
            }
        })
    }
    return (
        <div>
            <Header title="添加好友" />
            <Input onKeyUp={enterHandle} />
            {
                data && (Object.keys(data).length ? (
                    <Item {...data} btnClick={btnClick}/>
                ) : (
                    <p className={styles.noFound}>无此用户，请检查用户名是否正确</p>
                ))
            }
        </div>
    )
}