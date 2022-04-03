import React from "react";
import Style from './index.module.css'
export default function Information(props) {
    const { type } = props; // text: 文本  img: 图片
    const { info, headPortrait } = props;
    const { direction = "left" } = props;
    
    const posClass = direction === 'left' ? Style.derectionL : Style.derectionR;
    console.log(direction, posClass);
    
    return (
        <div className={Style.wrap}>
            <div className={Style.left + " " + posClass}>
                <img className={Style.headPortrait} src={headPortrait} alt="头像" />
            </div>
            <div className={Style.right}>
                {
                    type === 'text' ? info + info + info
                        : <img src={info} alt="图片" />
                }
            </div>
        </div>
    )
}