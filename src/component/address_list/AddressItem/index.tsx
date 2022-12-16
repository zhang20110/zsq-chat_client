import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

export default function AddressItem(props) {
    const { headPorUrl, name, _id } = props;
    return (
        <div className={styles.wrap}>
            <Link to={`/chat/${_id}`} state={{name, headPorUrl}} className={styles.hidden}></Link>
            <div className={styles.left}>
                <img src={`/api/img/${headPorUrl}`} alt="头像" />
            </div>
            <div  className={styles.right}>
                {name}
            </div>
        </div>
    )
}