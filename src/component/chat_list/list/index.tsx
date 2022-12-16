import React from "react"
import { Link } from "react-router-dom"
import getTime from "../../../utils/getTime";
import styles from "./index.module.css"
export default (function (props) {
    const { name, headPorUrl, from, msg = "", type, time = 0, count = 0 } = props;
    const strTime = getTime(time, 'y-m-d');
    return (
        <div className={styles.list}>
            {/* opacity隐藏link组件 但保留事件 */}
            <Link to={`/chat/${from}`} state={{name, headPorUrl}} className={styles.hidden}></Link>
            <div className={styles.left}>
                <img src={`/api/img/${headPorUrl}`} alt="头像" />
            </div>
            <div className={styles.middle}>
                <div className={styles.name}>{name}</div>
                <div className={styles.information}>{
                    type === 'img' ? '图片' : msg
                }</div>
            </div>
            <div className={styles.right}>
                <div className={styles.time}>{strTime || ""}</div>
                { count ? <div className={styles.count}>{count}</div> : "" }
            </div>
        </div>
    )
})