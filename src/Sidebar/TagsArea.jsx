import { IconTag} from "@arco-design/web-react/icon";
import SidebarArea from "./SideBarArea.jsx";

export default function TagsArea() {
    let data = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    return (
        <SidebarArea title={"Tags"}
                     icon={<IconTag className="sidebar__area__title__icon" />}
                     data={data}
        />
    )
}