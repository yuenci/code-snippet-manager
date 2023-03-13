import {useEffect, useState} from "react";
import PubSub from "pubsub-js";
import "./EditorTopBar.css";
import {Modal, Space, Tag} from "@arco-design/web-react";
import Tools from "../Tools/Tools.js";
import {IconInfoCircle} from "@arco-design/web-react/icon";
import InfoModal from "../Sidebar/InfoModal.jsx";

export  default  function  EditorTopBar ( )  {
    const [gist, setGist] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const subscription = PubSub.subscribe('gistInfo', (msg, data) => {
            setGist(data.message)
        });
        return () => PubSub.unsubscribe(subscription);
    }, []);

    function showModal() {
        setVisible(true);
    }

    return (
        <div>
            <div className="editor-top-bar">
                <div className="editor-top-title">
                    {gist ? gist.title: "Title"}
                    <IconInfoCircle className={"info-icon"} onClick={showModal}/>
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

                    {gist ? "Last updated at " + Tools.ISO8601ToDDMMYYYY(gist.updated_at) : "Tags"}
                </div>
            </div>
            {
                gist ? <InfoModal visible={visible} setVisible={setVisible} gist={gist}/> : null
            }
        </div>


    )
 }