import {Drawer} from "@arco-design/web-react";

export  default  function HistoryDrawer(props) {
    const {showDrawer, setShowDrawer,gist} = props;
    console.log(gist)
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