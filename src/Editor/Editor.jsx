
import "./Editor.css";
import EditorTopBar from "./EditorTopBar.jsx";
import DiffEditor from "./DiffEditor.jsx";
import MainEditor from "./MainEditor.jsx";

export default function Sidebar() {
    let type = "1diff";

    return (
        <div className="editor" >
            <EditorTopBar/>
            { type === "diff"
                ? <DiffEditor/>
                : <MainEditor/>

            }
        </div>
    )
}