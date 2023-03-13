import {IconStar} from "@arco-design/web-react/icon";

export default function SidebarArea() {
    return(
        <div className="pinned__area" >
            <div className={"pinned__area__title"}>
                <IconStar className="sidebar__area__title__icon"  />
                <div className="sidebar__area__title__text">Starred</div>
            </div>

        </div>
    )
}