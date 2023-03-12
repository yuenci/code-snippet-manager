
import "./Editor.css";
import MainEditor from "./MainEditor.jsx";
import EditorTopBar from "./EditorTopBar.jsx";

export default function Sidebar() {


    return (
        <div className="editor" >
            <EditorTopBar/>
            <MainEditor/>
        </div>
    )
}