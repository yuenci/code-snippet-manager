import {Avatar, Button, Dropdown, Menu} from "@arco-design/web-react";
import Tools from "../../Tools/Tools.js";
import {IconDown} from "@arco-design/web-react/icon";
import {useEffect, useState} from "react";
import SettingsModal from "../Modal/SettingsModal.jsx";
import PubSub from "pubsub-js";

export  default  function AvatarDropdown(){
    const[showSettingsModal, setShowSettingsModal] = useState(false);
    const [login, setLogin] = useState("");
    const [avatar_url, setAvatar_url] = useState("");

    useEffect(() => {
        const subscription = PubSub.subscribe('nameAndAvatar', (msg, data) => {
            setLogin(data.message.login);
            setAvatar_url(data.message.avatar_url);
        });
        return () => PubSub.unsubscribe(subscription);
    }, []);

    const dropList = (
        <Menu onClickMenuItem={onClickMenuItem}>
            <Menu.Item key='1'>Settings</Menu.Item>
            <Menu.Item key='2'>Theme</Menu.Item>
            <Menu.Item key='3'>Help</Menu.Item>
            <Menu.Item key='4'>Log out</Menu.Item>
        </Menu>
    );

    function  onClickMenuItem(key) {
        if (key === '1') {
            setShowSettingsModal(true);
        } else if (key === '2') {
            console.log("Theme");
        } else if (key === '3') {
            console.log("Help");
        } else if (key === '4') {
            console.log("Log out");
        }
    }


    return(
        <div>
            <Dropdown droplist={dropList} trigger='click'
                      position='br'
            >
                <Avatar size={32}>
                    <img src={avatar_url}
                         className="avatar" alt="avatar"
                    />
                </Avatar>
                <Button type='text'>
                    {login && Tools.capitalizeFirstLetter(login)}
                    <IconDown/>
                </Button>
            </Dropdown>
            <SettingsModal visible={showSettingsModal} setVisible={setShowSettingsModal}/>
        </div>

    )
}