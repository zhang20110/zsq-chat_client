import React, { useRef } from "react";
import styles from "./index.module.css"
export default function Input(props) {
    const {onKeyUp} = props;
    const placehoderRef = useRef(null);
    const inputRef = useRef(null);
    // 为了点击placehoderRef元素时仍然实现input聚焦 所以使用click事件
    const focusHandle = (e) => {
        inputRef.current.focus(); 
        placehoderRef.current.style.opacity = '0';
    }
    const blurHandle = (e) => {
        if (!e.target.value) {
            placehoderRef.current.style.opacity = '1';
        }
    }
    const handle = (e) => {
        if (e.keyCode !== 13) {
            return;
        }
        onKeyUp(e.target.value);
    }
    return (
        <div onClick={focusHandle} onBlur={blurHandle} className={styles.wrap}>
            <input onKeyUp={handle} ref={inputRef}  className={styles.input} type="text" />
            <div ref={placehoderRef}  className={styles.placehoder}>
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-sousuo"></use>
                </svg>
                <span>搜索用户名</span>
            </div>
        </div>
    )
}