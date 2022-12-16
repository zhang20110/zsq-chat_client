import React, { useEffect, useRef, useState } from "react";
import Http from "../../../http";
import style from './index.module.css'
export default function Emoji(props) {
    const { getEmoji } = props;
    let { hidden } = props;
    const wrapRef = useRef(null);
    const [data, setData] = useState([]);
    const [activeType, setActiveType] = useState("");
    // 获取emoji数据
    useEffect(() => {
        const {promise, cancel} = Http('get', 'getEmoji');
        promise.then(res => {
            setData(res.data);
            setActiveType(res.data[0].type); // 默认选择第一个类型
        }).catch(err => {
            console.log("err emoji: ", err);
        })
        return cancel;
    }, []);
    // 隐藏或显示
    useEffect(() => {
        if (hidden) {
            wrapRef.current.classList.add(style.hidden);
        } else {
            wrapRef.current.classList.remove(style.hidden);
        }
    }, [hidden]);
    // 选中emoji
    const myClickCaputure = (e) => {
        if (e.target !== e.currentTarget) {
            getEmoji(e.target.innerText);
        }
    };
    // 切换选中的title
    const toggleStyle = (e) => {
        if (e.target !== e.currentTarget) {
            setActiveType(e.target.innerText);
        }
    }
    // 选中type 包含的emoji
    const [activeEmoji, setactiveEmoji] = useState([]);
    useEffect(() => {
        if (!activeType) return;
        setactiveEmoji(data.filter(v => v.type === activeType)[0].unicode);
    }, [activeType, data]);
    return (
        <div ref={wrapRef} className={style.wrap + " " + style.hidden}>
            <div onClickCapture={myClickCaputure} className={style.emojiWrap}>
                {
                    activeEmoji.map(v =>
                        <div className={style.emoji}>
                            {String.fromCodePoint(v)}
                        </div>
                    )
                }
            </div>
            <div onClickCapture={toggleStyle} className={style.bottom}>
                {
                    data.map(v => <div className={style.title + " " + (activeType === v.type ? style.active : "")}> {v.type} </div>)
                }
            </div>
        </div>
    )
}