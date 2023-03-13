import { Button } from "@arco-design/web-react";
import "./Sidebar.css";
// import StarArea from "./StarArea";
import LanguagesArea from "./LanguagesArea";
import Starred from "./Starred.jsx";
import TagsArea from "./TagsArea";
import { useState } from "react";
import MiniEditor from "../Editor/MiniEditor.jsx";
import { Modal, Input, InputTag } from "@arco-design/web-react";

export default function Sidebar() {
    const [visible, setVisible] = useState(false);
    const TextArea = Input.TextArea;

    function showModal() {
        setVisible(true);
    }

    return (
        <div className="sidebar">
            <div>
                <img src="https://utoolsfigurebed.oss-cn-hangzhou.aliyuncs.com/1621259076791.png" className="avatar" alt="avatar" />
                <Button type="primary" onClick={showModal}>New Snippet</Button>
            </div>
            <div className="func__areas">
                <LanguagesArea />
                <Starred />
                <TagsArea />
            </div>
            <Modal
                title='New Snippet'
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                autoFocus={false}
                focusLock={true}
                okText='Submit'
                cancelText='Cancel'
            >
                <Input style={{ width: "100%", marginBottom: "10px" }} allowClear placeholder='Enter The File Name' />
                <TextArea placeholder='Enter The Description' style={{ minHeight: 64, width: "100%", marginBottom: "10px" }} />
                <InputTag
                    allowClear
                    placeholder='Enter The Tags'
                    style={{ width: "100%", marginBottom: "10px" }}
                />
                <MiniEditor />
            </Modal>
        </div>
    )
}