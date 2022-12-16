import React from "react";
import { useNavigate } from "react-router";
import styles from "../header/index.module.css";
export default function Header(props) {
    const { title } = props;
    const navigator = useNavigate();
    const backClick = (e) => {
        navigator(-1);
    };
    return (
        <div className={styles.header}>
            <svg onClick={backClick} className="icon" aria-hidden="true">
                <use xlinkHref="#icon-fanhui"></use>
            </svg>
            <span className={styles.title}>{title}</span>
        </div>
    )
}