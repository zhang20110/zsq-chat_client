import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./index.module.css";

export default function Code(props) {
    const {hidden, setHidden, sendMes} = props;
    const [text, setText] = useState("");
    const wrapRef = useRef(null);
    const showRef = useRef(null);
    // 隐藏view
    const myClick = () => {
        setHidden(true);
    }
    useEffect(() => {
        if (hidden === true) {
            wrapRef.current.classList.add(styles.hidden);
        } else {
            wrapRef.current.classList.remove(styles.hidden);
        }
    }, [hidden]);
    // 显示code
    useLayoutEffect(() => {
        const ele = showRef.current;
        /**
         * textContent innerHTML innerText取舍
         * innerHTML无法将html语言识别为普通的语言 导致无法写入html元素
         * innerText会导致pre换行失效
         * textContent 不会识别html语言为标签 且可以成功换行
         */
        ele.textContent  = text;
        ele.removeAttribute('class'); // 清除class 重新计算语言
    }, [text]); 
    // 渲染代码
    useLayoutEffect(() => {
        if (!showRef.current) return;
        const code = showRef.current;
        if (!code) return;
        const hljs = (window as any).hljs;
        hljs.highlightElement(code);
    }, [text]);
    // 发送代码
    const btnClick = () => {
        sendMes(text.trim(), 'code');
        setText("");
    };
    return (
        <div ref={wrapRef}  className={styles.wrap + " " + styles.hidden}>
            <div className={styles.title}>
                请输入代码，语言自动识别...
                <svg onClick={myClick} className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-shanchu"></use>
                </svg>
            </div>
            <div>
                <textarea onChange={(e) => setText(e.target.value.trim())} className={styles.section + " " + styles.textarea}></textarea>
                <div style={{whiteSpace: 'pre'}} className={styles.section}
                    ><code style={{padding: 0}} ref={showRef}
                ></code></div>
            </div>
            <div className={styles.bottom}>
                <button onClick={btnClick} className={styles.btn}>发送</button>
            </div>
        </div>
    )
}