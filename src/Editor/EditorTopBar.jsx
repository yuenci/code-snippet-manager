import {useEffect, useState} from "react";
import PubSub from "pubsub-js";

export  default  function  EditorTopBar ( )  {
    const [gist, setGist] = useState(null);
    useEffect(() => {
        const subscription = PubSub.subscribe('gistInfo', (msg, data) => {
            setGist(data.message)
        });
        return () => PubSub.unsubscribe(subscription);
    }, []);

    return (
        <div>
            <div>
                {gist ? gist.title: "Title"}
            </div>
            <div>
                {gist ? gist.description: "Description"}
            </div>
            <div>Tags</div>
            <div>
                    {gist ? gist.created_at + "-" + gist.updated_at : "Tags"}
            </div>
        </div>
    )
 }