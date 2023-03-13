import "./ContentArea.css";
import Tools from "../Tools/Tools.js";
import PubSub from 'pubsub-js';
import {Dropdown, Menu} from "@arco-design/web-react";
import {useEffect, useState,} from "react";
import StatusContainer from "../Tools/StatusContainer.js";

export  default  function ContentCard(props){
    const {gist,active, setActive} = props;
    const [cardStyle, setCardStyle] = useState("content-card");
    //const [history, setHistory] = useState([]);

    function onClickMenuItem(key) {
        console.log(key);
    }

    const  dropList   =  (
        <Menu onClickMenuItem={onClickMenuItem}>
            <Menu.Item key='1'>Share snippet</Menu.Item>
            <Menu.Item key='2'>Star snippet</Menu.Item>
            <Menu.Item key='3'>Copy snippet</Menu.Item>
            <Menu.Item key='4'>Copy Link</Menu.Item>
            <Menu.Item key='5'>Delete snippet</Menu.Item>
            <Menu.Item key='6'>Generate image</Menu.Item>
            <Menu.Item key='7'>Export code</Menu.Item>
        </Menu>
    )

    useEffect(() => {
        if (active === gist.id) {
            setCardStyle("content-card content-card-active")
            setHistoryHandler();
        }else{
            setCardStyle("content-card")
        }

    }, [active]);

    function setHistoryHandler(){
        Tools.getHistoryData(gist.id).then(data => {
            //console.log(data);
            //setHistory(data);
            PubSub.publish('history', { message: data });
        });
    }

    function  clickHandler() {
        setActive(gist.id)
        PubSub.publish('updateEditorData', { gist_id: gist.id });
        PubSub.publish('switchEditor', {
            type: "main",
            content:StatusContainer.currentCodeContent,
        });
    }

    return (
        <div className={cardStyle} onClick={clickHandler}>
            <Dropdown
                trigger='contextMenu'
                position='bl'
                droplist={dropList}
            >
                <div className="content-card-title">
                    {gist.title}
                </div>
                <div className="content-card-description">
                    {gist.description}
                </div>
                <div className="content-card-description">
                    {Tools.ISO8601ToDDMMYYYY(gist.updated_at)}
                </div>
            </Dropdown>

        </div>
    )
}