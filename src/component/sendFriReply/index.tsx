import React, { useEffect, useState } from "react";
import Http from "../../http";
import Header from "../header";
import Item from "../sendFriSeq/Item";
import wss from "../../webSocket"

export default function SendFriReply() {
    const [data, setData] = useState([]);
    // 获取自己发送的好友请求
    useEffect(() => {
        const { promise, cancel } = Http("get", '/getRequest');
        promise.then(res => {
            if (res.data && res.data.length) {
                const data = res.data.map(v => {
                    let noHandle = "";
                    if (v.status === 'wait') {
                        noHandle = '等待验证';
                    } else if (v.status === 'agree') {
                        noHandle = "已同意";
                    } else {
                        noHandle = '已拒绝';
                    }
                    return {
                        ...v,
                        myStyle: { backgroundColor: 'transparent', color: '#ccc' },
                        noHandle
                    }
                })
                setData(data);
            }
        }).catch(err => {
            console.log('sendFrireply: ', err);
        })
        return cancel;
    }, []);
    // 如果好友请求被处理 接受处理结果
    useEffect(() => {
        wss.emit(data => {
            if (data.mesType === 'sendFriReply') {
                const {status, to} = data;
                setData(pre => {
                    for (let i = 0; i < pre.length; ++i) {
                        if (pre[i].from === to) {
                            let noHandle = "";
                            if (status === 'wait') {
                                noHandle = '等待验证';
                            } else if (status === 'agree') {
                                noHandle = "已同意";
                            } else {
                                noHandle = '已拒绝';
                            }
                            pre[i].noHandle = noHandle;
                        }
                    }
                    return [...pre];
                })
            }
        })
    }, []);
    return (
        <div>
            <Header title="好友申请"/>
            {
                data.map(v => <Item {...v} />)
            }
        </div>
    )
}