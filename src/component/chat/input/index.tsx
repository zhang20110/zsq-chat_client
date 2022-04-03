import React, { useEffect, useRef, useState } from "react";
import style from './index.module.css'
/**
 * 自定义输入框：
 * 1. 自适应高度
 * 2. 光标居中
 * 3. 保留输入格式(通过value可以拿到正确的格式)
 */
export default function Input() {
    const [text, setText] = useState("");
    const [height, setHeight] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);
    const ref = useRef(null);
    const refTextarea = useRef(null);
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
    }, [text]);
    useEffect(() => {
        refTextarea.current.style.height = scrollHeight + height + 'px';
    }, [scrollHeight, height]);
    return (
        <div className={style.wrapper}>
            <textarea ref={refTextarea} className={style.input} onChange={e => setText(e.target.value)} value={text} />
            <div className={style.right}>
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-jiahao1"></use>
                </svg>
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-biaoqing"></use>
                </svg>
            </div>
            {/* 当text后面只有一个换行时，pre的高度不更新，猜测会忽略最后一个换行符
            所以手动多加一个换行符 */}
            <pre ref={ref} className={style.testHeight}>{
                text.lastIndexOf('\n') !== -1
                    ? text + '\n' : text}</pre>
        </div>
    )
}