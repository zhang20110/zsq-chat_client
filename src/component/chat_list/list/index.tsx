import React from "react"
import { Link } from "react-router-dom"
import styles from "./index.module.css"
export default (function () {
    const address = "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96f0a05789384c07afc8a5eed9b7bffc~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?"
    return (
            <div className={styles.list}>
                {/* opacity隐藏link组件 但保留事件 */}
                <Link to="/chat/1" className={styles.hidden}></Link>
                <div className={styles.left}>
                    <img src={address} alt="头像" />
                </div>
                <div className={styles.middle}>
                    <div className={styles.name}>王开来</div>
                    <div className={styles.information}>我在吃屎我在吃屎我在吃屎我在吃屎我在吃屎我在吃屎我在吃屎我在吃屎我在吃屎</div>
                </div>
                <div className={styles.right}>
                    <div className={styles.time}>2021-12-21</div>
                    <div className={styles.count}>5</div>
                </div>
            </div>
    )
})