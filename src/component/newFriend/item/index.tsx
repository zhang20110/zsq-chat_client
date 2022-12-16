import React from "react";
import styles from './index.module.css'

export default function Item(props) {
    const { headPorUrl, name, status, handle, from } = props;
    const clickHandle = (e) => {
        if (e.target.tagName.toLowerCase() !== 'button') return;
        const value = e.target.value;
        return handle(from, value);
    }
    return (
        <div onClick={clickHandle} className={styles.wrap}>
            <img src={`/api/img/${headPorUrl}`} alt="" />
            <span className={styles.name}>{name}</span>
            {
                status === 'wait' &&
                (
                    <>
                        <button value="agree" className={styles.btn} >
                            同意
                        </button>
                        <button value="reject" className={styles.btn} >
                            拒绝
                        </button>
                    </>
                )
            }
            {
                status === 'agree' &&
                (
                    <span className={styles.text} >
                        已同意
                    </span>
                )
            }
            {
                status === 'reject' &&
                (
                    <span className={styles.text} >
                        已拒绝
                    </span>
                )
            }
        </div>
    )
}