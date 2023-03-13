import {Avatar, Button, Dropdown, Menu, Notification} from "@arco-design/web-react";
import {IconDown, IconPlus, IconSync} from "@arco-design/web-react/icon";
import Tools from "../Tools/Tools.js";
import "./Sidebar.css";
import {useEffect, useState} from "react";
import PubSub from "pubsub-js";

export default function SidebarTopArea(props) {
    const {showModal} = props;
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
        <Menu>
            <Menu.Item key='1'>Settings</Menu.Item>
            <Menu.Item key='2'>Help</Menu.Item>
            <Menu.Item key='3'>Log out</Menu.Item>
        </Menu>
    );

    function showNotification() {
        PubSub.publish('updateContentsData', { message: 'updateEditorData' });
        Notification.success({
            title: 'Success',
            content: 'This is a success Notification!',
        })
    }

    return (
        <div className="Sidebar-top-con">
            <div className="Sidebar-top-avatar">

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
            </div>
            <div
                onClick={showModal}
                className="Sidebar-top-new-snippet"
            >
                <Button shape='circle' type='primary' icon={<IconPlus/>}/>
                <span>New Snippet</span>
            </div>
            <div
                onClick={showNotification}
                className="Sidebar-top-new-snippet"
            >
                <Button shape='circle' type='primary' icon={<IconSync />}/>
                <span>Sync Snippets</span>
            </div>
        </div>
    )
}