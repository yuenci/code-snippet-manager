import "./ContentArea.css";
import Tools from "../Tools/Tools.js";
import PubSub from 'pubsub-js';
import {Dropdown, Menu} from "@arco-design/web-react";
import {useEffect, useState} from "react";


export  default  function ContentCard(props){
    const {gist,active, setActive} = props;
    const [cardStyle, setCardStyle] = useState("content-card");
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
        }else{
            setCardStyle("content-card")
        }
    }, [active]);

    function  clickHandler() {
        Tools.getRawContent(gist.files[0].raw_url).then(data => {
            //console.log(data)
            PubSub.publish('gistInfo', { message: gist });
            PubSub.publish('codeValue', { message: data });
            setActive(gist.id)
        })
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