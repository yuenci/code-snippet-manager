import {useEffect, useState} from "react";
import "./EditorTopBar.css";
import Tools from "../Tools/Tools.js";
import {IconHistory, IconInfoCircle, IconStar, IconStarFill, IconSync} from "@arco-design/web-react/icon";
import InfoModal from "./InfoModal.jsx";
import HistoryDrawer from "./HistoryDrawer.jsx";
import StatusContainer from "../Tools/StatusContainer.js";
import TagsContainer from "./TagsContainer.jsx";
import PubSub from "pubsub-js";
import {Input} from "@arco-design/web-react";
import DescModifyModal from "./DescModifyModal.jsx";

export  default  function  EditorTopBar ( props)  {
    const {gist_id} = props;
    const [gist, setGist] = useState(null);
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [starred, setStarred] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [descValue , setDescValue] = useState(Tools.getDesc(gist));

    function star(){
        if(StatusContainer.starredGists.find((item) => item.id === gist_id)){
            setStarred(true);
        }else{
            setStarred(false);
        }
    }

    function randomStopSync(){
        // random seconds from 0.5 - 2
        let random = Math.random() * (2 - 0.5) + 0.5 ;

        setTimeout(() => {
            setIsSyncing(false)
        }, random * 1000);
    }

    useEffect(() => {
        setGist(StatusContainer.ClearAllGistsData.find((item) => item.id === gist_id));
        star();
    }  , [gist_id]);

    useEffect(() => {
        const subscription = PubSub.subscribe('syncing', () => {
            setIsSyncing(true)
            randomStopSync();
        });
        const subscription1 = PubSub.subscribe('synced', () => {
            setIsSyncing(false)
        });
        return () => {
            PubSub.unsubscribe(subscription)
            PubSub.unsubscribe(subscription1)
        };
    }, []);

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

    function showDescModifyModal(){
        setVisible1(true);
    }

    function descOnChange(value){
        setDescValue(value);
    }

    let tags = Tools.getTags(gist);
    let desc = Tools.getDesc(gist);


    return (
        <div>
            <div className="editor-top-bar">
                <div className="editor-top-title">
                    {gist &&
                        <Input  value={gist.title} className="input-bgc-white" />
                    }
                    {/*{gist ? gist.title: "Title"}*/}
                    <div className="editor-top-title-right">
                        <IconSync spin={isSyncing} className={"sync-icon"}/>
                        {starred
                        ? <IconStarFill className={"star-icon-filled"} onClick={isStarred}/>
                        :    <IconStar className={"star-icon"} onClick={isStarred}/>
                    }
                        <IconHistory  className={"history-icon"} onClick={ showDrawerHandler} />
                        <IconInfoCircle className={"info-icon"} onClick={showModal}/>
                    </div>

                </div>
                <div className="editor-top-desc">
                    {gist &&
                        <Input  value={desc} className="input-bgc-white" onClick={showDescModifyModal} onChange={descOnChange} />
                    }
                </div>
                <div className="tags-container">
                    <TagsContainer tags={tags}/>
                </div>
                <div>
                    {gist ? "Last updated at " + Tools.ISO8601ToDateTime(gist.updated_at) : "Tags"}
                </div>
            </div>
            {
                gist ? <InfoModal visible={visible} setVisible={setVisible} gist={gist}/> : null
            }
            <HistoryDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} gist={gist}/>
            <DescModifyModal visible={visible1} setVisible={setVisible1} value={desc} modify={setDescValue}/>
        </div>


    )
 }