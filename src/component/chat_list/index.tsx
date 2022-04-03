import React from "react"
import styles from "./index.module.css"
import List from './list/index'
import Header from "../header"
import Footer from "../footer"
export default (function() {
    return (
        <div className={styles.main}>
            <Header title="消息"/>
            <div className={styles.section}>
                <List/>
                <List/>
            </div>
            <Footer></Footer>
        </div>
    )
})