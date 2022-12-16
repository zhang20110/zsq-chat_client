import React, { useState } from "react";
import { useNavigate } from "react-router";
import http from "../../http";
import LogAndRegUI from "../logAndRegUI";
export default function Register() {
    const imgs = 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96f0a05789384c07afc8a5eed9b7bffc~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp';
    const history= useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const register = (data) => {
        const {promise, cancel} = http('post', 'register', data)
        setIsLoading(true);
        return promise.then(() => {
            history('/chat');
        }).catch(err => {
            if (err.response && err.response.status === 422) {
                alert('用户名已存在');
            }
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        })
        return cancel;
    }
    return (
        <LogAndRegUI loading={isLoading} myCallback={register} imgs={imgs} title="注册" to="/login" toMsg="登陆"/>
    )
}