import {Drawer} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import HistoryCard from "./HistoryCard.jsx";

export  default  function HistoryDrawer(props) {
    const {showDrawer, setShowDrawer} = props;
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const subscription = PubSub.subscribe('history', (msg, data) => {
            let historyData = data.message;
            //console.log(historyData)
            setHistory(historyData)
            /*for (let i = 0; i < historyData.length; i++) {
                let files = historyData[i].files;
                let keys = Object.keys(files);
                console.log(files[keys[0]])
                console.log(files[keys[0]].content)
            }*/

        });
        return () => PubSub.unsubscribe(subscription);
    }, []);

    //console.log(gist)
    return(
        <Drawer
            width={332}
            title={<span>History Records</span>}
            visible={showDrawer}
            onOk={() => {
                setShowDrawer(false);
            }}
            okText="OK"
            onCancel={() => {
                setShowDrawer(false);
            }}
            cancelText="Close"
        >
            {history.length >0 &&
                history.map((item, index) => {
                   return  <HistoryCard key={index} history={item} setShowDrawer={setShowDrawer} />
                })
            }
        </Drawer>
    )
}