import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from './index.module.css'

export default function Scroll(props: {scrollHeight: number, scrollTop: number}) {
    const {scrollHeight, scrollTop} = props;
    const refWarp = useRef(null);
    const refBar = useRef(null);
    const [clientHeight, setClientHeight] = useState(0);
    useEffect(() => {
        setClientHeight(refWarp.current.clientHeight);
    }, [])
    // 使用layout 优化闪烁
    useLayoutEffect(() => {
        if (!clientHeight) return;
        const height = Math.floor(clientHeight / scrollHeight * clientHeight)
        const heightTop = Math.floor(scrollTop / scrollHeight * clientHeight)
        refBar.current.style.height = height + 'px';
        refBar.current.style.top = heightTop + 'px';
        refWarp.current.style.top = scrollTop + 'px';
    }, [scrollHeight, scrollTop, clientHeight]);
    return (
        <div ref={refWarp} className={styles.wrap}>
            <div ref={refBar} className={styles.bar}></div>
        </div>
    )
}