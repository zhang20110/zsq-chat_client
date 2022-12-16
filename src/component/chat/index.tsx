import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useLocation, useParams } from "react-router"
import Http from "../../http"
import Header from "../header"
import Style from './index.module.css'
import Information from "./information"
import Input from "./input"
import wss, { cancelEmit } from '../../webSocket'
import { setItem } from "../../localStorage"
import MathView from "./mathView"
import debounce from "../../utils/debounce"
import Scroll from "./scroll"
import throttle from "../../utils/throttle"
import Code from "./code"
interface scrollType {
    scrollHeight: number;
    scrollTop: number;
}
export default function Chat() {
    const params = useParams();
    const location = useLocation();
    const { id: to } = params;
    const { name, headPorUrl } = location.state as { name: string, headPorUrl: string };
    const [data, setData] = useState([]);
    const [math, setMath] = useState(false);
    const [isNoMessage, setNoMessage] = useState(false);
    const [isScroll, setIsScroll] = useState(false);
    const [scrollState, setScrollState] = useState({} as scrollType);
    const [codeHidden, setCodeHidden] = useState(true);
    const mathRender = useRef(null);
    const scrollRef = useRef({} as { bottomHeight?: number, is?: boolean });
    const [ myHeadPorUrl, setMyHeadPorUrl ] = useState("");
    // 获取自己的头像
    useEffect(() => {
        const {promise, cancel} = Http('get', 'getSelfInfo');
        promise.then(res => {
            setMyHeadPorUrl(res.data.headPorUrl);
        }).catch(err => {
            console.log('user err: ', err.response);
        });
        return cancel;
    }, []);
    useEffect(() => {
        const { promise, cancel } = Http('post', 'getMessage', { to });
        promise.then(res => {
            setData(res.data.data);
            mathRender.current.scrollTop =
                mathRender.current.scrollHeight - mathRender.current.clientHeight;
        }).catch(err => {
            console.log('chat err: ', err);
        })
        return cancel;
    }, [to]);
    // 发送消息
    const sendMes = useCallback((msg: string | File, type: string) => {
        const data = {
            to,
            msg,
            type,
            mesType: 'sendMessage'
        };
        // 提前to在chat_list中的排名
        setItem('users', to);
        wss.send(data)
    }, [to]);
    // 接受消息
    useEffect(() => {
        const f = res => {
            if (res.mesType === 'sendMessage') {
                setData(pre => [...pre, res])
                // 有消息往来的联系人记录在localStorage
                setItem('users', to);
                // 如果接受到了对方的消息且在/caht/:id路由 则表明消息已读
                if (/^\/chat\/[\w]+$/.test(location.pathname) && res.from === to) {
                    console.log('接受到了消息：', location.pathname, res);
                    wss.send({
                        mesType: 'sendMessageStatus',
                        ids: [res._id],
                    });
                }
                // 如果成功发送消息 则页面滑动到底部
                if (res.from !== to) {
                    const ele = mathRender.current;
                    if (!ele) return;
                    ele.scrollTop =
                        ele.scrollHeight - ele.clientHeight;
                }
            }
        };
        wss.emit(f);
        // 删除 订阅
        return cancelEmit.bind(null, f);
    }, [to, location]);
    // 接受消息状态改变
    useEffect(() => {
        const f = (data) => {
            if (data.mesType === 'sendMessageStatus') {
                const { updateIds } = data;
                setData(pre => {
                    for (let i = 0; i < pre.length; ++i) {
                        if (updateIds.indexOf(pre[i]._id) !== -1) {
                            pre[i].status = 'read';
                        }
                    }
                    return [...pre];
                })
            }
        };
        wss.emit(f);
        return cancelEmit.bind(f);
    }, []);
    // 当出现消息往来后 重新渲染页面的mathascill
    useEffect(() => {
        if (!data.length) return;
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, mathRender.current]);
    }, [data]);
    const scrollDe = debounce(() => {
        if (!isNoMessage) {
            const ele = mathRender.current;
            // 记录当前页面的滚动位置
            scrollRef.current.bottomHeight = ele.scrollHeight - ele.scrollTop;
            scrollRef.current.is = true;
            const { promise } = Http('post', 'getMessage', { to, skip: data.length });
            promise.then(res => {
                const { data } = res.data;
                if (!data.length) {
                    setNoMessage(true);
                    return;
                }
                setData(pre => [...res.data.data, ...pre]);
            }).catch(err => {
                console.log('chat err: ', err);
            })
        }
    })
    // 滚动到顶部时 请求新的数据
    const scrollHandle = () => {
        setIsScroll(true); // 触发滚动事件 则表明页面内容溢出 可以出现滚动条了
        const ele = mathRender.current;
        setScrollState({
            scrollHeight: ele.scrollHeight,
            scrollTop: ele.scrollTop
        });
        if (ele.scrollTop === 0) {
            scrollDe();
        }
    };
    // 当请求新的数据后，调整scrollTop防止当前消息被挤出页面
    useLayoutEffect(() => {
        if (scrollRef.current.is) {
            scrollRef.current.is = false;
            const ele = mathRender.current;
            ele.scrollTop = ele.scrollHeight - scrollRef.current.bottomHeight;
        }
    }, [data]);
    // 如果首次加载页面后，没有出现滚动条 则需要wheel事件
    const wheelHandle = e => {
        const ele = mathRender.current;
        if (ele.scrollHeight === ele.clientHeight && e.deltaY < 0) {
            scrollDe();
        }
    };
    return (
        <div className={Style.wrapper}>
            <Header title={name} />
            <div onWheel={wheelHandle} onScroll={scrollHandle} ref={mathRender} className={Style.section}>
                {
                    isNoMessage && (
                        <div className={Style.noMessage}>
                            <span className={Style.line}></span>
                            <div className={Style.title}>没有更多消息了</div>
                            <span className={Style.line}></span>
                        </div>
                    )
                }
                {
                    data.map(v => <Information {...v} 
                        headPorUrl={v.from === to ? headPorUrl: myHeadPorUrl}
                        direction={v.from === to ? 'left' : 'right'} />)
                }
                {
                    isScroll && (
                        <Scroll {...scrollState} />
                    )
                }
            </div>
            <Input sendMes={sendMes} codeClick={() => setCodeHidden(false)} mathClick={() => setMath(true)} />
            {
                math && (
                    <MathView sendMes={sendMes} mathClick={() => setMath(false)} />
                )
            }
            <Code hidden={codeHidden} sendMes={sendMes} setHidden={setCodeHidden}/>
        </div>
    )
}