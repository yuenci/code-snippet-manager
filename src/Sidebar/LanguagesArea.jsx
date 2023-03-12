import {useEffect, useState} from "react";
import TagCard from "./TagCard.jsx";
import {IconCode} from "@arco-design/web-react/icon";

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
        <div className="languages__area" >
            <div className="languages__area__title">
                <IconCode className="sidebar__area__title__icon" />
                <div className="sidebar__area__title__text">Languages</div>
            </div>
            <div className="languages__area__con scrollbar-4px">
                {languages &&
                    languages.map((language, index) => {
                        return <TagCard key={index} text={language}/>
                    })
                }
                {languages &&
                    languages.map((language, index) => {
                        return <TagCard key={index} text={language}/>
                    })
                }
            </div>
        </div>
    )
}