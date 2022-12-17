import React, { useLayoutEffect, useState } from "react";
import LogAndRegUI from "../logAndRegUI";
import http from "../../http";
import { useNavigate } from "react-router-dom";
import { connect } from "../../webSocket";
export default function Login(props) {
    const imgs = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqVJTQinzCq46z_H8NqBwTgdkfmG18fApyw2chxBsGOQ9YNwEJjpJs&usqp=CAE&s';
    const history = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const login = (data) => {
        const { promise } = http('post', '/login', data);
        setIsLoading(true);
        return promise.then(() => {
            history('/chat');
            connect();
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        })
    }
    useLayoutEffect(() => {
        const { promise, cancel } = http('post', '/login', {})
        promise.then(() => {
            history('/chat');
            connect();
        }).catch(err => console.log('登陆错误: cookie过期'))
        return cancel;
    }, [history]);
    return (
        <LogAndRegUI loading={isLoading} myCallback={login} imgs={imgs} title="登陆" to="/register" toMsg="注册" />
    )
}