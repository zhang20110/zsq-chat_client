import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Http from "../../../http";
import Emoji from "../emoji";
import style from './index.module.css'
/**
 * 自定义输入框：
 * 1. 自适应高度
 * 2. 光标居中
 * 3. 保留输入格式(通过value可以拿到正确的格式)
 */
export default function Input(props) {
    const { sendMes, mathClick, codeClick } = props;
    const [text, setText] = useState("");
    const [height, setHeight] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [selectionStart, setSelectionStart] = useState(0);
    const ref = useRef(null);
    const refTextarea = useRef(null);
    const refMenu = useRef(null);
    // 输入框自适应高度
    useEffect(() => {
        const style = window.getComputedStyle(refTextarea.current);
        const borderHeight = (parseInt(style.borderTopWidth) || 0)
            + (parseInt(style.borderBottomWidth) || 0);
        const paddingHeight = (parseInt(style.paddingTop) || 0)
            + (parseInt(style.paddingBottom) || 0);
        setHeight(borderHeight + paddingHeight);
    }, []);
    useEffect(() => {
        const heights = parseInt(ref.current.scrollHeight) || 0;
        if (heights !== scrollHeight) setScrollHeight(heights);
    }, [text, scrollHeight]);
    useEffect(() => {
        refTextarea.current.style.height = scrollHeight + height + 'px';
    }, [scrollHeight, height]);
    const btnHandle = useCallback(() => {
        sendMes(text.trim(), 'text');
        setText("");
        // 隐藏emoji 和 菜单栏
        btnAdd(true);
        setIsEmoji(true);
    }, [sendMes, text]);
    // 显示或隐藏菜单栏
    const btnAdd = (is?: boolean | undefined) => {
        if (is === undefined) {
            refMenu.current.classList.toggle(style.hidden);
        } else if (is) {
            refMenu.current.classList.add(style.hidden);
        } else {
            refMenu.current.classList.remove(style.hidden);
        }
        // 显示菜单栏的时候 隐藏emoji
        if (!refMenu.current.classList.contains(style.hidden)) {
            setIsEmoji(true);
        }
    }
    // 点击发送数学公式菜单
    const MyMathClick = () => {
        mathClick(); // 显示写数学公式的面板
        btnAdd(); // 隐藏菜单
    }
    // 点击发送代码
    const myCodeClick = () => {
        codeClick();
        btnAdd();
    }
    // 发送图片
    const fileHandle = (e) => {
        const file = e.target.files[0];
        if (!file || !file.size) {
            return;
        }
        const fromData = new FormData();
        fromData.append("imgMsg", file, file.type);
        const { promise } = Http('post', 'sendImgMessage', fromData);
        btnAdd(); // 隐藏菜单
        promise.then(res => {
            const { name } = res.data;
            sendMes(name, 'img');
        }).catch(err => {
            console.log('err imgMsg: ', err);
        })
    }
    // 显示 或 隐藏 emoji
    const [isEmoji, setIsEmoji] = useState(true); // 默认隐藏
    const myEmojiClick = () => {
        setIsEmoji(pre => {
            // 显示emoji时 隐藏菜单栏
            if (pre) {
                btnAdd(true);
            };
            return !pre;
        }); // 显示emoji
    }
    // 在输入框插入emoji
    const insertEmoji = (emoji: string) => {
        // 获取光标位置，不适用于ie
        const ele = refTextarea.current;
        if (typeof ele.selectionStart === 'number') {
            const pos = ele.selectionStart;
            setText(pre => {
                return pre.slice(0, pos) + emoji + pre.slice(pos);
            })
            // 光标位置恢复 一个emoji占两个字符的长度(四个字节)
            setSelectionStart(pos+2);
        }
    }
    // 光标位置还原
    // 当插入emoji后，光标位置为恢复到0，需要手动还原
    useEffect(() => {
        refTextarea.current.setSelectionRange(selectionStart, selectionStart);
        // 光标选择后最好加上focus 否则有时候会出现光标位置设置失败
        refTextarea.current.focus();
    }, [selectionStart])
    return (
        <div className={style.wrapper}>
            <textarea placeholder="输入..." ref={refTextarea} className={style.input} onChange={e => setText(e.target.value)} value={text} />
            <div className={style.right}>
                <svg onClick={myEmojiClick} className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-biaoqing"></use>
                </svg>
                {
                    text.trim() === '' ? (
                        <svg onClick={() => btnAdd()} className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-jiahao1"></use>
                        </svg>
                    ) : (
                        <button className={style.btn} onClick={btnHandle}>发送</button>
                    )
                }
            </div>
            {/* 表情栏 */}
            <Emoji getEmoji={insertEmoji} data={[{type: '情感', unicode: [129293]}, {type: '搞笑',unicode: [128420]}]} hidden={isEmoji}/>
            {/* 菜单栏 */}
            <div ref={refMenu} className={style.menu + " " + style.hidden}>
                <ul>
                    <li>发送图片
                        <input accept="image/*" onChange={fileHandle} className={style.file} type="file" name="img" />
                    </li>
                    <li onClick={myCodeClick}>发送代码</li>
                    <li onClick={MyMathClick}>发送数学公式</li>
                </ul>
            </div>
            {/* 当text后面只有一个换行时，pre的高度不更新，猜测会忽略最后一个换行符
            所以手动多加一个换行符 */}
            <pre ref={ref} className={style.testHeight}>{
                text.lastIndexOf('\n') !== -1
                    ? text + '\n' : text}</pre>
        </div>
    )
}