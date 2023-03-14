import "./Sidebar.css";
import LanguagesArea from "./LanguagesArea";
import Starred from "./Starred.jsx";
import TagsArea from "./TagsArea";
import { useState } from "react";
import {Input} from "@arco-design/web-react";
import SidebarTopArea from "./SidebarTopArea.jsx";
import SubmitModal from "./SubmitModal.jsx";

export default function Sidebar() {
    const [visible, setVisible] = useState(false);
    const TextArea = Input.TextArea;


    function showModal() {
        setVisible(true);
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
            <SubmitModal visible={visible} setVisible={setVisible} />
        </div>
    )
}