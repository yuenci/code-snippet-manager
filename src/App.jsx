// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/tauri";
import Sidebar from "./Sidebar/Sidebar";
import ContentArea from "./ContentArea/ContentArea";
import Editor from "./Editor/Editor";
import "./App.css";
import "@arco-design/web-react/dist/css/arco.css";



function App() {

  return (
    <div className="container">
      <Sidebar />
      <ContentArea />
      <Editor />
    </div>
  );
}

export default App;
