import React from "react";
import styles from "./index.module.css";
export default function Header(props) {
    const { headPortrait, name, address, state } = props;
    return (
        <div>
            <div className={styles.top}>
                <img src={headPortrait} alt="头像" />
            </div>
            <p className={styles.name}>{name}</p>
            <div className={styles.bottom}>
                <div className={styles.address}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-didian"></use>
                    </svg>
                    <span >{address}</span>
                </div>
                {/* <span className={styles.line}></span> */}
                <span className={styles.state}>{state}</span>
            </div>
        </div>
    )
}