import React from "react";
import { Link } from "react-router-dom";
import styles from './index.module.css'

export default function Item(props) {
    const {title, href} = props;
    return (
        <Link className={styles.wrap} to={href}>
            <div className={styles.left}>
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-shezhi"></use>
                </svg>
            </div>
            <div className={styles.right}>
                <div className="title">{title}</div>
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-jinrujiantou"></use>
                </svg>
            </div>
        </Link>
    )
} 