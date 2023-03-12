import {useEffect, useState} from "react";
import { getPublicGists } from "../Tools/octokitTools.js";
import ContentCard from "./ContentCard.jsx";
// import StatusContainer from "../Tools/StatusContainer.js";
import Tools from "../Tools/Tools.js";

export default function Sidebar() {
    const [clearGistsData, setClearGistsData] = useState([]);

    useEffect(() => {
        getPublicGists().then(
            function (data){
                setClearGistsData(Tools.clearGistsData(data));
            }
        );
    }   , []);

    return (
        <div className="content__area" >
            <div>ContentArea</div>
            { clearGistsData.length > 0 &&
                clearGistsData.map((gist,index) => {
                    return <ContentCard
                        key={index}
                        gist={gist}
                    />
                })
            }
        </div>
    )
}