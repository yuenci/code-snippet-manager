import {Avatar, Button, Dropdown, Menu,Notification} from "@arco-design/web-react";
import {IconDown, IconPlus} from "@arco-design/web-react/icon";
import "./Sidebar.css";

export default  function SidebarTopArea(props) {
    const {showModal} = props;

    const dropList = (
        <Menu>
            <Menu.Item key='1'>Settings</Menu.Item>
            <Menu.Item key='2'>Help</Menu.Item>
            <Menu.Item key='3'>Log out</Menu.Item>
        </Menu>
    );

    function showNotification() {
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
                        <img src="https://utoolsfigurebed.oss-cn-hangzhou.aliyuncs.com/1621259076791.png"
                             className="avatar" alt="avatar"
                        />
                    </Avatar>
                    <Button type='text'>
                        Innis
                        <IconDown />
                    </Button>
                </Dropdown>
            </div>
            <div
                onClick={showModal}
                className="Sidebar-top-new-snippet"
            >
                <Button shape='circle' type='primary' icon={<IconPlus />}  />
                <span>New Snippet</span>
            </div>
            <div
                onClick={showNotification}
                className="Sidebar-top-new-snippet"
            >
                <Button shape='circle' type='primary' icon={<IconPlus />}  />
                <span>Sync Snippets</span>
            </div>
        </div>
    )
}