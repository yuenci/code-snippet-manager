import {useState} from "react";
import {Modal, Input} from "@arco-design/web-react";

export default function DescModifyModal(props){
    const TextArea = Input.TextArea;
    const {visible, setVisible,value,modify} = props;
    const [text, setText] = useState(value);

    function  onChangeHandler(value) {
        setText(value);
        modify(value);
    }

    return(
        <Modal
            title='Description'
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
            closable={false}
        >
            <TextArea placeholder='Please enter ...' value={value} className="desc-textarea" onChange={onChangeHandler}/>
        </Modal>
    )
}