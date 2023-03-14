import { Button, Notification} from "@arco-design/web-react";
import { IconPlus, IconSync} from "@arco-design/web-react/icon";

import "./Sidebar.css";
import PubSub from "pubsub-js";
import AvatarDropdown from "../Component/Dropdown/AvatarDropdown.jsx";

export default function SidebarTopArea(props) {
    const {showModal} = props;

    function Sync() {
        PubSub.publish('updateContentsData', { message: 'updateEditorData' });
        Notification.success({
            title: 'Success',
            content: 'This is a success Notification!',
        })
    }

    return (
        <div className="Sidebar-top-con">
            <div className="Sidebar-top-avatar">
                <AvatarDropdown/>
            </div>
            <div
                onClick={showModal}
                className="Sidebar-top-new-snippet"
            >
                <Button shape='circle' type='primary' icon={<IconPlus/>}/>
                <span>New Snippet</span>
            </div>
            <div
                onClick={Sync}
                className="Sidebar-top-new-snippet"
            >
                <Button shape='circle' type='primary' icon={<IconSync />}/>
                <span>Sync Snippets</span>
            </div>
        </div>
    )
}