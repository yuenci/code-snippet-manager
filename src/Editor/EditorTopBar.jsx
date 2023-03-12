import {useEffect, useState} from "react";
import PubSub from "pubsub-js";
import "./EditorTopBar.css";
import {Space, Tag} from "@arco-design/web-react";
import Tools from "../Tools/Tools.js";
import {IconInfoCircle} from "@arco-design/web-react/icon";

export  default  function  EditorTopBar ( )  {
    const [gist, setGist] = useState(null);
    useEffect(() => {
        const subscription = PubSub.subscribe('gistInfo', (msg, data) => {
            setGist(data.message)
        });
        return () => PubSub.unsubscribe(subscription);
    }, []);

    return (
        <div className="editor-top-bar">
            <div className="editor-top-title">
                {gist ? gist.title: "Title"}
                <IconInfoCircle className={"info-icon"} />
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
    )
 }