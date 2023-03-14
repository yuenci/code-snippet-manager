import {useEffect, useState} from "react";
import ContentCard from "../Component/Card/ContentCard.jsx";
import Tools from "../Tools/Tools.js";
import "./ContentArea.css";
import ContentTopArea from "./ContentTopArea.jsx";
import PubSub from "pubsub-js";

export default function ContentArea() {
    const [clearGistsData, setClearGistsData] = useState([]);
    const [active, setActive] = useState(false);
    const [filterData, setFilterData] = useState([]);

    function updateContentsData() {
        // read new gist data  load first gist data
        Tools.getClearingData().then(data=>{
            setClearGistsData(data);
            setFilterData(data);
            setActive(data[0].id);
            PubSub.publish('updateEditorData', { gist_id: data[0].id });
        })
    }

    /*function searchRawData(keyword){
        //console.log(StatusContainer.idRowUrlMap);

        /!*Tools.initRawDataCache().then(data=>{
            data.map((item) => {
                // if keyword in data then return
                if (item.indexOf(keyword) > -1){
                    console.log(item)
                    return item;
                }
            })
        })*!/
    }*/

    useEffect(() => {
        const subscription = PubSub.subscribe('filterData', (msg, data) => {
            const keyword = data.message;
            if (keyword === "")  setFilterData(clearGistsData);

            let newFilterData = clearGistsData.filter((item) => {
                if (item.description.indexOf(keyword) > -1) {
                    return item;
                }else if (item.title.indexOf(keyword) > -1) {
                    return item;}
                else if (item.files[0].filename.indexOf(keyword) > -1) {
                    return item;
                }
            });
            setFilterData(newFilterData);
        });
        return () => PubSub.unsubscribe(subscription);
    }   , []);

    // subscribe update all data and show it in editor area
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
                { clearGistsData.length > 0 && filterData.length > 0 &&
                    filterData.map((gist,index) => {
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