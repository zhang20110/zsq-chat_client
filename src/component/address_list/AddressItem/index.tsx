import React from "react";
import styles from "./index.module.css";

export default function AddressItem(props) {
    const { address, name } = props;
    return (
        <div className={styles.wrap}>
            <div className={styles.left}>
                <img src={address} alt="头像" />
            </div>
            <div  className={styles.right}>
                {name}
            </div>
        </div>
    )
}