import React, { useEffect, useRef } from "react";
import Style from './index.module.css'
import Math from '../math'
export default function Information(props) {
    const { type } = props; // text: 文本  img: 图片
    const { msg, headPorUrl, status, _id: id } = props;
    const { direction = "left" } = props;
    const codeRef = useRef(null);

    const posClass = direction === 'left' ? Style.derectionL : Style.derectionR;
    const rightR = direction === 'left' ? "" : Style.rightR;
    const orderR = direction === 'left' ? "" : Style.orderR;
    useEffect(() => {
        if (type === 'code') {
            const code = codeRef.current;
            if (!code) return;
            const hljs = (window as any).hljs;
            hljs.highlightElement(code);
        }
    }, [type]);
    return (
        <div key={id} className={Style.wrap}>
            <div className={Style.left + " " + posClass}>
                <img className={Style.headPortrait} src={`/api/img/${headPorUrl}`} alt="头像" />
            </div>
            <div className={Style.right + " " + rightR}>
                <div className={Style.text}>
                    {
                        type === 'text' && <div style={{ whiteSpace: 'pre' }}>{msg}</div>
                    }
                    {
                        type === 'img' && <img src={`/api/img/${msg}`} alt="图片" />
                    }
                    {
                        type === 'math' && <div style={{ whiteSpace: 'pre' }}><Math data={msg} /></div>
                    }
                    {
                        type === 'code' && <div style={{ whiteSpace: 'pre' }}><code style={{backgroundColor: 'transparent', padding: 0}} ref={codeRef}>{msg}</code></div>
                    }
                </div>
                {
                    direction === 'left' ? "" : (
                        <div className={Style.status + " " + orderR}>
                            {status === 'read' ? '已读' : '未读'}
                        </div>
                    )
                }
            </div>
        </div>
    )
}