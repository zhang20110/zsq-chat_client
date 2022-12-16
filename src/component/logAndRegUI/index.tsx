import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from './index.module.css'

export default function LogAndRegUI(props) {
    const { title, to, toMsg, myCallback, imgs, loading=false } = props;
    const [ name, setName ] = useState<string>();
    const [ password, setPass ] = useState<string>();
    const dataRef = useRef<{[k in string]: any}>({});
    useEffect(() => {
        dataRef.current.data = { name, password };
    }, [name, password]);
    // 当组件卸载的是否取消请求
    useEffect(() => {
        if (dataRef.current.fun) {
            dataRef.current.fun();
        }
    }, []);
    return (
        <div className={styles.wrap}>
            <div className={styles.top}><img src={imgs} alt="" /></div>
            <div className={styles.middle}>
                <div className={styles.line}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-ziyuanxhdpi"></use>
                    </svg>
                    <input required type="text" onChange={e => setName(e.target.value.trim())} value={name} />
                </div>
                <div className={styles.line}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-tianchongxing-"></use>
                    </svg>
                    <input required type="password" onChange={e => setPass(e.target.value.trim())} name={password} />
                </div>
            </div>
            <div className={styles.bottom}>
                <button  onClick={() => {
                    if (loading) {
                        alert("正在"+title+", 请耐心等待");
                        return;
                    }
                    const {data} = dataRef.current;
                    if (!data.name || !data.password) {
                        alert("用户名或密码不能为空");
                        return;
                    }
                    dataRef.current.fun = (myCallback(data))
                }}>{
                    loading ? `${title}中...` : title
                }</button>
                <Link to={to}>{toMsg}</Link>
            </div>
        </div>
    )
}