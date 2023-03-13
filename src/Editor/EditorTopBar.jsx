import {useEffect, useState} from "react";
import "./EditorTopBar.css";
import { Space, Tag} from "@arco-design/web-react";
import Tools from "../Tools/Tools.js";
import {IconHistory, IconInfoCircle, IconStar, IconStarFill} from "@arco-design/web-react/icon";
import InfoModal from "../Sidebar/InfoModal.jsx";
import HistoryDrawer from "./HistoryDrawer.jsx";
import StatusContainer from "../Tools/StatusContainer.js";

export  default  function  EditorTopBar ( props)  {
    const {gist_id} = props;
    const [gist, setGist] = useState(null);
    const [visible, setVisible] = useState(false);
    const [starred, setStarred] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    function star(){
        if(StatusContainer.starredGists.find((item) => item.id === gist_id)){
            setStarred(true);
        }else{
            setStarred(false);
        }
    }

    useEffect(() => {
        setGist(StatusContainer.ClearAllGistsData.find((item) => item.id === gist_id));
        star();
    }  , [gist_id]);

    function showModal() {
        setVisible(true);
    }

    function showDrawerHandler() {
        //console.log("showDrawerHandler")
        setShowDrawer(true);
    }

    function isStarred(){
        setStarred(!starred);
        if(starred === true){
            //console.log("unstar")
            Tools.unStarGist(gist_id)
        }else{
            //console.log("star")
            Tools.starGist(gist_id)
        }
    }

    return (
        <div>
            <div className="editor-top-bar">
                <div className="editor-top-title">
                    {gist ? gist.title: "Title"}
                    <div className="editor-top-title-right">
                        {starred
                        ? <IconStarFill className={"star-icon-filled"} onClick={isStarred}/>
                        :    <IconStar className={"star-icon"} onClick={isStarred}/>
                    }
                        <IconHistory  className={"history-icon"} onClick={ showDrawerHandler} />
                        <IconInfoCircle className={"info-icon"} onClick={showModal}/>
                    </div>

                </div>
                <div className="editor-top-desc">
                    {gist ? gist.description: "Description"}
                </div>
                <div className="tags-container">
                    <Space>
                        <Tag checkable color='green' defaultChecked closable>Awesome</Tag>
                        <Tag checkable color='red' defaultChecked>
                            Toutiao
                        </Tag>
                        <Tag checkable color='arcoblue' defaultChecked closable >
                            Lark
                        </Tag>
                    </Space>
                </div>
                <div>

                    {gist ? "Last updated at " + Tools.ISO8601ToDateTime(gist.updated_at) : "Tags"}
                </div>
            </div>
            {
                gist ? <InfoModal visible={visible} setVisible={setVisible} gist={gist}/> : null
            }
            <HistoryDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} gist={gist}/>
        </div>


    )
 }