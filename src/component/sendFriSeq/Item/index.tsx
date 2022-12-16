import React from "react";
import styles from './index.module.css'

export default function Item(props) {
    const { headPorUrl, name, friend=false, handle="", noHandle="", btnClick, myStyle={} } = props;
    return (
        <div className={styles.wrap}>
            <img src={`/api/img/${headPorUrl}`} alt="" />
            <span className={styles.name}>{name}</span>
            {
                friend ?
                    (

                        <button disabled={friend} className={styles.disabled} >
                            {handle}
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-jinzhi"></use>
                            </svg>
                        </button>
                    ) : (
                        <button onClick={btnClick} className={styles.btn} disabled={friend} style={myStyle}>
                            {noHandle}
                        </button>
                    )
            }
        </div>
    )
}