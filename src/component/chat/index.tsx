import React from "react"
import Header from "../header"
import Style from './index.module.css'
import Information from "./information"
import Input from "./input"
export default function Chat() {
    const str = '你好淡粉色大家反撒肯ak撒家反撒肯a撒扽a';
    const address = "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96f0a05789384c07afc8a5eed9b7bffc~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?"
    return (
        <div className={Style.wrapper}>
            <Header title="王开来"/>
            <div className={Style.section}>
              <Information type="text" info={str} headPortrait={address}/> 
              <Information type="text" info={str} headPortrait={address}/> 
              <Information direction="right" type="text" info={str} headPortrait={address}/> 
            </div>
            <Input/>
        </div>
    )    
}