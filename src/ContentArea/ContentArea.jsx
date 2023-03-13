import {useEffect, useState} from "react";
import ContentCard from "./ContentCard.jsx";
// import StatusContainer from "../Tools/StatusContainer.js";
import Tools from "../Tools/Tools.js";
import "./ContentArea.css";
import ContentTopArea from "./ContentTopArea.jsx";
import Gist from "../Tools/gist.js";

export default function Sidebar() {
    const [clearGistsData, setClearGistsData] = useState([]);

    useEffect(() => {
        Gist.get({ type: Gist.type.getGists }).then(data=>{
            console.log(data)
            setClearGistsData(Tools.clearGistsData(data));
        })

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