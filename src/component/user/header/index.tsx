import React, { useState } from "react";
import Http from "../../../http";
import styles from "./index.module.css";
export default function Header(props) {
    const { headPorUrl = "", name = "", signatrue = "", location = "", updateUserInfo, updateData } = props;
    const [isEditLocation, setIsEditLocation] = useState(false);
    const [isEditSianature, setIsEditSianatur] = useState(false);
    const [isEditName, setIsEditName] = useState(false);
    // 更改个人信息
    const editInfo = (e) => {
        if (e.key.toLowerCase() === 'enter') {
            const ele = e.target as any;
            const value = ele.value.trim();
            const name = e.target.dataset.name;
            if (value) {
                updateUserInfo({
                    [name]: value
                });
            }
            if (name === 'location') setIsEditLocation(false);
            if (name === 'signatrue') setIsEditSianatur(false);
            if (name === 'name') setIsEditName(false);
        }
    };
    // 更改头像
    const editPic = (e) => {
        const file = e.target.files[0];
        if (!file || !file.size) {
            return
        }
        const formdata = new FormData();
        formdata.append('image', file, file.type); 
        const {promise} = Http('post', 'updateHeadPorUrl', formdata);
        promise.then(res => {
            updateData(res.data);
        }).catch(err => {
            console.log('updateHeadPorUrl err: ', err);
        })
    }
    return (
        <div>
            <div className={styles.top}>
                {/* 首次加载时 还没获取到headPorUrl时 不加载图片 */}
                {
                    headPorUrl && <img src={'/api/img/' + headPorUrl} className={styles.img} alt="点击更换头像" />
                }
                <input onChange={editPic} type="file" accept="image/*" className={styles.file}/>
            </div>
            {
                <p onDoubleClick={() => setIsEditName(true)} className={styles.name}>
                    {
                        isEditName ? (
                            <input style={{ width: '35%', margin: '0 auto' }} data-name="name" onKeyUp={editInfo} className={styles.input} defaultValue={name} placeholder="输入昵称..." type="text" />
                        ) : name
                    }
                </p>
            }
            <div className={styles.bottom}>
                <div className={styles.address}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-didian"></use>
                    </svg>
                    {
                        isEditLocation ? (
                            (
                                <input data-name="location" onKeyUp={editInfo} className={styles.input} defaultValue={location} placeholder="输入地址..." type="text" />
                            )
                        ) : (
                            <span onDoubleClick={() => setIsEditLocation(true)}>{location || "添加地址"}</span>
                        )
                    }
                </div>
                {
                    isEditSianature ? (
                        <input style={{ width: '45%', marginRight: '8px' }} data-name="signatrue" onKeyUp={editInfo} className={styles.input} defaultValue={signatrue} placeholder="签名..." type="text" />
                    ) : (
                        <span onDoubleClick={() => setIsEditSianatur(true)} className={styles.state}>{signatrue || "添加签名"}</span>
                    )
                }
            </div>
        </div>
    )
}