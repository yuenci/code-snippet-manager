import {useEffect, useState} from "react";
import {IconCode} from "@arco-design/web-react/icon";
import SidebarArea from "./SideBarArea.jsx";

export default function LanguagesArea() {

    const [languages, setLanguages] = useState([]);

    function addLanguage(language){
        // is language not  in languages then add it
        setLanguages((prev) => {
            if (languages.indexOf(language) === -1) {
                return [...prev, language]
            }else{
                return prev;
            }
        });
    }

    useEffect(() => {
        const subscription = PubSub.subscribe('language', (msg, data) => {
            //console.log(data.message);
            addLanguage(data.message);
        });
        return () => PubSub.unsubscribe(subscription);
    }, []);
    return (
        <SidebarArea title={"Languages"}
                     icon={<IconCode className="sidebar__area__title__icon" />}
                     data={languages}
        />
    )
}