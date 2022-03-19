import React from "react";
import Main from "./component/main/index";
import './app.moudle.css'

function App() {
  return (
    <div className="app">
      {/* // 数学表达式黑板 */}
      <div style={{flexGrow: 1}}></div>
      {/* 聊天界面 */}
      <Main/>
    </div>
  );
}

export default App;
