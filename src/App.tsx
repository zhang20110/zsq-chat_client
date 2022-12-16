import React from "react";
import Router from "./component/router/index";
import Style from './app.module.css'

function App() {
  return (
    <div className={Style.app}>
      <Router/>
    </div>
  );
}

export default App;
