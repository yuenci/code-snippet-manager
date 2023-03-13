import "./ContentArea.css";
import Tools from "../Tools/Tools.js";
import PubSub from 'pubsub-js';
import {Dropdown, Menu} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import Gist from "../Tools/gist.js";

export  default  function ContentCard(props){
    const {gist,active, setActive} = props;
    const [cardStyle, setCardStyle] = useState("content-card");
    const [history, setHistory] = useState([]);
    const  dropList   =  (
        <Menu>
            <Menu.Item key='1'>Haidian</Menu.Item>
            <Menu.Item key='2'>Chaoyang</Menu.Item>
            <Menu.Item key='3'>Daxing</Menu.Item>
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
        Gist.get({ type: Gist.type.getGist, gist_id: gist.id }).then(data => {
            //console.log(data);
            setHistory(data.history);
        })
    }

    function  clickHandler() {
        Tools.getRawContent(gist.files[0].raw_url).then(data => {
            //console.log(data)
            PubSub.publish('gistInfo', { message: gist });
            PubSub.publish('codeValue', { message: data });
            setActive(gist.id)
        })

        const oldData = { name: 'Tom', age: 20 };
        const newData = { name: 'Jerry', age: 21 };

        const difference = diff(oldData, newData);
        console.log(difference)

    }

    return (
        <div className={cardStyle} onClick={clickHandler}>
            <Dropdown
                trigger='contextMenu'
                position='bl'
                droplist={dropList }
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