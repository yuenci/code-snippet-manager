import {useEffect, useState} from "react";
import { getPublicGists } from "../Tools/octokitTools.js";
import ContentCard from "./ContentCard.jsx";
// import StatusContainer from "../Tools/StatusContainer.js";
import Tools from "../Tools/Tools.js";
import "./ContentArea.css";
import ContentTopArea from "./ContentTopArea.jsx";

export default function Sidebar() {
    const [clearGistsData, setClearGistsData] = useState([]);

    useEffect(() => {
        getPublicGists().then(
            function (data){
                console.log(data)
                setClearGistsData(Tools.clearGistsData(data));
            }
        );
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
                        />
                    })
                }
                { clearGistsData.length > 0 &&
                    clearGistsData.map((gist,index) => {
                        return <ContentCard
                            key={index}
                            gist={gist}
                        />
                    })
                }
                { clearGistsData.length > 0 &&
                    clearGistsData.map((gist,index) => {
                        return <ContentCard
                            key={index}
                            gist={gist}
                        />
                    })
                }
                { clearGistsData.length > 0 &&
                    clearGistsData.map((gist,index) => {
                        return <ContentCard
                            key={index}
                            gist={gist}
                        />
                    })
                }
            </div>

        </div>
    )
}