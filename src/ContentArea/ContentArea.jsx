import {useEffect, useState} from "react";
import { getPublicGists } from "../Tools/octokitTools.js";
import ContentCard from "./ContentCard.jsx";
import StatusContainer from "../Tools/StatusContainer.js";

export default function Sidebar() {
    const [clearGistsData, setClearGistsData] = useState([]);

    useEffect(() => {
        getPublicGists().then(
            function (){
                setClearGistsData(StatusContainer.ClearAllGistsData);
            }
        );
    }   , []);

    return (
        <div className="content__area" >
            <div>ContentArea</div>
            {
                clearGistsData.map((gist,index) => {
                    return <ContentCard key={index} title={gist.title} description={gist.description} />
                })
            }
        </div>
    )
}