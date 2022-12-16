import React from "react"
import Style from './index.module.css'
import { Outlet } from 'react-router-dom'
function Main(props) {
    return (
        <div id={Style.main}>
            <Outlet />
        </div>
    )
}
export default Main