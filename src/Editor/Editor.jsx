
import "./Editor.css";
import EditorTopBar from "./EditorTopBar.jsx";
import DiffEditor from "./DiffEditor.jsx";

export default function Sidebar() {


    return (
        <div className="editor" >
            <EditorTopBar/>
            {/*<MainEditor/>*/}
            <DiffEditor/>
        </div>
    )
}