import React, { useCallback, useEffect, useRef, useState } from "react";
import style from './index.module.css'
import Math from '../math'

export default function MathView(props) {
    const { mathClick, sendMes } = props;
    const demoRendering = useRef(null);
    const [data, setData] = useState('');
    useEffect(() => {
        // 重新渲染 demoRendering 里面的数学表达式
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, demoRendering.current]);
    }, [data]);
    const changeHandle = useCallback((e) => {
        setData(e.target.value);
        // 不能在这儿进行重新渲染数学表达式
        // 因为 渲染会在react更新页面之前，所以会导致渲染的结果被react所覆盖
        // MathJax.Hub.Queue(["Typeset", MathJax.Hub, demoRendering.current]);
    }, []);
    const btnClick = () => {
        sendMes(data.trim(), 'math');
        setData("");
    };
    return (
        <div className={style.wrap}>
            <div className={style.top}>
                <span className={style.title}>请输入数学公式
                    <a target="_blank" href="http://asciimath.org/" rel="noreferrer">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-wenti"></use>
                        </svg>
                    </a>
                </span>
                <svg onClick={mathClick} className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-shanchu"></use>
                </svg>
            </div>
            <div className={style.section}>
                <textarea onChange={changeHandle} value={data} placeholder="请输入数学公式..." className={style.textarea} id="" cols={30} rows={10}></textarea>
                <div ref={demoRendering} className={style.right}>
                    <Math data={data} />
                </div>
            </div>
            <div className={style.bottom}>
                <button onClick={btnClick} className={style.btn}>发送</button>
            </div>
        </div>
    )
}