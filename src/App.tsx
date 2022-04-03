import React from "react";
import Router from "./component/router/index";
import Style from './app.module.css'

function App() {
  console.log(Style);
  return (
    <div className={Style.app}>
      {/* // 数学表达式黑板 */}
      <div style={{flexGrow: 1}}></div>
      {/* 聊天界面 */}
      <Router/>
    </div>
  );
}

export default App;
