import React, { useState } from "react";
import { useNavigate } from "react-router";
import http from "../../http";
import LogAndRegUI from "../logAndRegUI";
export default function Register() {
    const imgs = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqVJTQinzCq46z_H8NqBwTgdkfmG18fApyw2chxBsGOQ9YNwEJjpJs&usqp=CAE&s';
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
            return cancel;
        }).finally(() => {
            setIsLoading(false);
            return cancel;
        })
    }
    return (
        <LogAndRegUI loading={isLoading} myCallback={register} imgs={imgs} title="注册" to="/login" toMsg="登陆"/>
    )
}