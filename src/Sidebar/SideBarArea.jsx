import {IconCaretDown, IconCaretRight} from "@arco-design/web-react/icon";
import TagCard from "./TagCard.jsx";
import {useState} from "react";

export default function SidebarArea(props) {
    const {title, icon, data} = props;
    const [show, setShow] = useState(false);

    function  showHandler(){
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
                    {data &&
                        data.map((itemText, index) => {
                            return <TagCard key={index} text={itemText}/>
                        })
                    }
                    {data &&
                        data.map((itemText, index) => {
                            return <TagCard key={index} text={itemText}/>
                        })
                    }
                </div>
            }
        </div>
    )
}