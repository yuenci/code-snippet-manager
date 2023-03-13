
import "./Editor.css";
import EditorTopBar from "./EditorTopBar.jsx";
import DiffEditor from "./DiffEditor.jsx";
import MainEditor from "./MainEditor.jsx";
import {useEffect, useState} from "react";
import PubSub from "pubsub-js";
import StatusContainer from "../Tools/StatusContainer.js";

export default function Sidebar() {
    const [type, setType] = useState("main");
    const [content, setContent] = useState(null);
    const [gist_id, setGistId] = useState(null);

    useEffect(() => {
        const subscription = PubSub.subscribe('switchEditor', (msg, data) => {
            //console.log(data.message);
            if(StatusContainer.currentEditor !== data.type){
                console.log(StatusContainer.currentEditor,data.type)

                if(data.type === "diff"){
                    setType("diff");
                }else if( data.type === "main"){
                    setType("main");
                }else{
                    setType("main");
                }
                StatusContainer.currentEditor = data.type;
                setContent(data.content);
            }else if(data.type === "diff"){
                PubSub.publish('updateDiffEditor', { message: data.content });
            }

        });
        return () => PubSub.unsubscribe(subscription);
    }, []);

    useEffect(() => {
        const subscription1 = PubSub.subscribe('updateEditorData', (msg, data) => {
            setGistId(data.gist_id);
        });
        return () => PubSub.unsubscribe(subscription1);
    }, []);

    return (
        <div className="editor" >
            <EditorTopBar gist_id={gist_id}/>
            { type === "diff"
                ? <DiffEditor content={content} />
                : <MainEditor content={content}  gist_id={gist_id} />
            }
        </div>
    )
}