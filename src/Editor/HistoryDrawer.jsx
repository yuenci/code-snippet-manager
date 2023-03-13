import {Drawer} from "@arco-design/web-react";
import {useEffect, useState} from "react";

export  default  function HistoryDrawer(props) {
    const {showDrawer, setShowDrawer,gist} = props;
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const subscription = PubSub.subscribe('history', (msg, data) => {
            let historyData = data.message;
            setHistory(historyData)
            for (let i = 0; i < historyData.length; i++) {
                let files = historyData[i].files;
                let keys = Object.keys(files);
                //console.log(files[keys[0]])
                //console.log(files[keys[0]].content)
            }

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
            <div>Here is an example text.</div>

            <div>Here is an example text.</div>
        </Drawer>
    )
}