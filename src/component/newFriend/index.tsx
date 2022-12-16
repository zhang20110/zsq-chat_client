import React, { useEffect, useState } from "react";
import Http from "../../http";
import Header from "../header";
import Item from "./item";
import wss from "../../webSocket";

export default function NewFriend() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const { promise, cancel } = Http("get", '/getReply');
        promise.then(res => {
            if (res.data && res.data.length) {
                setData(res.data);
            }
        }).catch(err => {
            console.log('newFriend: ', err);
        })
        return cancel;
    }, []);
    // 同意或拒绝好友申请
    // to: 好友id 同data状态里的from
    const handle = (to: string, status: 'reject' | 'agree') => {
        wss.send({
            mesType: "sendFriReply",
            to,
            status
        });
    };
    useEffect(() => {
        wss.emit(data => {
            if (data.mesType === 'sendFriReply') {
                const {status, to} = data;
                setData(pre => {
                    for (let i = 0; i < pre.length; ++i) {
                        if (pre[i].from === to) {
                            pre[i].status = status;
                        }
                    }
                    return [...pre];
                })
            }
        })
    }, []);
    return (
        <div>
            <Header title="新朋友" />
            {
                data.map(v => <Item handle={handle} {...v} />)
            }
        </div>
    )
}