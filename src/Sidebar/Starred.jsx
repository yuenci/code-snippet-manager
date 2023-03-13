import { IconStar} from "@arco-design/web-react/icon";
import SidebarArea from "./SideBarArea.jsx";
export default function Starred() {
    let data = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    return (
        <SidebarArea title={"Starred"}
                     icon={<IconStar className="sidebar__area__title__icon" />}
                     data={data}
        />
    )
}