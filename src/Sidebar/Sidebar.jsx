import "./Sidebar.css";
// import StarArea from "./StarArea";
import LanguagesArea from "./LanguagesArea";
import Starred from "./Starred.jsx";
import TagsArea from "./TagsArea";
import { useState } from "react";
import MiniEditor from "../Editor/MiniEditor.jsx";
import {Modal, Input, InputTag, Notification} from "@arco-design/web-react";
import SidebarTopArea from "./SidebarTopArea.jsx";
import Tools from "../Tools/Tools.js";
import PubSub from "pubsub-js";

export default function Sidebar() {
    const [visible, setVisible] = useState(false);
    const TextArea = Input.TextArea;
    const [fileName, setFileName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState("");

    function showModal() {
        setVisible(true);
    }

    function submitHandler(){
        //setVisible(false);

        let newTags = tags.map((tag) => {
            return  "#" + tag.trim() ;
        });

        let tagsStr = " [" + newTags.join(",") + "]";

        //console.log(fileName, description  + tagsStr, content)

        if (fileName === "" ||  content === ""){
            showNotification("warning");
            return;
        }

        Tools.createGist(fileName, description + tagsStr, content).then((res) => {
            console.log(res);
            clearState();
            setVisible(false);
            PubSub.publish('updateContentsData', { message: 'updateEditorData' });
            showNotification("success");
        });
    }

    function clearState(){
        setFileName("");
        setDescription("");
        setTags([]);
        setContent("");
    }

    function showNotification(type) {
        if(type==="warning"){
            Notification.warning({
                title: 'Warning',
                content: 'Please enter the file name and content!',
            });
        }
        else if (type === "success"){
            Notification.success({
                title: 'Success',
                content: 'Successfully created a new snippet!',
            });
        }

    }




    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <SidebarTopArea showModal={showModal} />
            </div>
            <div className="func__areas">
                <LanguagesArea />
                <Starred />
                <TagsArea />
            </div>
            <Modal
                title='New Snippet'
                visible={visible}
                onOk={submitHandler}
                onCancel={() => setVisible(false)}
                autoFocus={false}
                focusLock={true}
                okText='Submit'
                cancelText='Cancel'
            >
                <Input style={{ width: "100%", marginBottom: "10px" }}
                       allowClear placeholder='Enter The File Name'
                       onChange={setFileName}
                />
                <TextArea placeholder='Enter The Description'
                          style={{ minHeight: 64, width: "100%", marginBottom: "10px" }}
                            onChange={setDescription}
                />
                <InputTag
                    allowClear
                    placeholder='Enter The Tags'
                    style={{ width: "100%", marginBottom: "10px" }}
                    onChange={setTags}
                />
                <MiniEditor setContent={setContent} />
            </Modal>
        </div>
    )
}