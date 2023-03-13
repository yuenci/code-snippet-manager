import {IconStar} from "@arco-design/web-react/icon";
import SidebarArea from "./SideBarArea.jsx";
import {useEffect, useState} from "react";
import Tools from "../Tools/Tools.js";

export default function Starred() {
    const [data, setData] = useState(["a1111", "b", "c", "d", "e", "f", "g", "h", "i", "j"]);


    useEffect(() => {
        getNewData();
    }, []);
    let getNewData = () => {
        console.log("hi from starred area")
        Tools.getStarredGists().then((res) => {
            setData(res);
        });
    };
    return (
        <SidebarArea title={"Starred"}
                     icon={<IconStar className="sidebar__area__title__icon"/>}
                     data={data}
                     onExpand={getNewData}
                     type={"starred"}
        />
    )
}