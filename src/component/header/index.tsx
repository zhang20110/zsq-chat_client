import React from "react";
import styles from "../header/index.module.css";
export default function Header(props) {
    const { title } = props;
    return (
        <div className={styles.header}>
            <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-fanhui"></use>
            </svg>
            <span className={styles.title}>{title}</span>
        </div>
    )
}