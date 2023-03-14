import {useEffect, useState} from "react";
import ContentCard from "./ContentCard.jsx";
import Tools from "../Tools/Tools.js";
import "./ContentArea.css";
import ContentTopArea from "./ContentTopArea.jsx";
import PubSub from "pubsub-js";

export default function ContentArea() {
    const [clearGistsData, setClearGistsData] = useState([]);
    const [active, setActive] = useState(false);

    function updateContentsData() {
        Tools.getClearingData().then(data=>{
            setClearGistsData(data);
            setActive(data[0].id);
            PubSub.publish('updateEditorData', { gist_id: data[0].id });
        })
    }

    useEffect(() => {
        const subscription = PubSub.subscribe('filterData', (msg, data) => {
            const keywork = data.message;
            //console.log(clearGistsData);
            let filterData = clearGistsData.filter((item) => {
                if (item.description.indexOf(keywork) > -1) {
                    return item;
                }else if (item.title.indexOf(keywork) > -1) {
                    return item;}
                else if (item.files[0].filename.indexOf(keywork) > -1) {
                    return item;
                }
            });
            setClearGistsData(filterData);
        });
        return () => PubSub.unsubscribe(subscription);
    }   , []);

    useEffect(() => {
        updateContentsData();

        const subscription = PubSub.subscribe('updateContentsData', () => {
            updateContentsData();
        });
        return () => PubSub.unsubscribe(subscription);
    }   , []);

    return (
        <div className="content__area" >
            <ContentTopArea/>
            <div className="content-cards-container">
                { clearGistsData.length > 0 &&
                    clearGistsData.map((gist,index) => {
                        return <ContentCard
                            key={index}
                            gist={gist}
                            active={active}
                            setActive={setActive}
                        />
                    })
                }
            </div>

        </div>
    )
}