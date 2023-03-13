import {IconCaretDown, IconCaretRight} from "@arco-design/web-react/icon";
import TagCard from "./TagCard.jsx";
import {useState} from "react";

export default function SidebarArea(props) {
    const {title, icon, data,onExpand,type} = props;
    const [show, setShow] = useState(false);
    const [itemData , setItemData] = useState(data);

    function  showHandler(){
        if(!show) onExpand();
        setShow(!show);
    }

    return(
        <div className={show? "sidebar__area": ""} >
            <div className={"sidebar__area__title"} onClick={ showHandler}>
                {icon}
                <div className="sidebar__area__title__text" >{title}</div>
                <div className="arrow-con">
                    {show
                        ? <IconCaretDown className="sidebar__area__title__arrow"  />
                        : <IconCaretRight className="sidebar__area__title__arrow" />
                    }
                </div>
            </div>
            {
                <div className="sidebar__area__items__con scrollbar-4px"
                    style={{display: show ? "block" : "none"}}
                >
                    {itemData && type !== "starred" &&
                        data.map((itemText, index) => {
                            return <TagCard key={index} text={itemText}/>
                        })
                    }

                    {itemData && type === "starred" &&
                        data.map((item, index) => {
                            return <TagCard key={index} text={item.description} type="starred" data={item} />
                        })
                    }
                </div>
            }
        </div>
    )
}