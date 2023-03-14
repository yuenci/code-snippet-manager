import {Modal} from "@arco-design/web-react";

export default function SettingsModal(props){
    const{visible, setVisible} = props;

    return(
        <Modal
            title='Description'
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
        >
            <h1>hello</h1>
        </Modal>
    )
}