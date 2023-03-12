import {IconPushpin} from "@arco-design/web-react/icon";

export default function PinnedArea() {
    return (
        <div className="pinned__area" >
            <div className={"pinned__area__title"}>
                <IconPushpin className="sidebar__area__title__icon"  />
                <div className="sidebar__area__title__text">PinnedArea</div>
            </div>

        </div>
    )
}