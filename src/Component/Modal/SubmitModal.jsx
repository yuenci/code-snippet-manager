import {Input, InputTag, Modal, Notification, Spin} from "@arco-design/web-react";
import MiniEditor from "../../Editor/MiniEditor.jsx";
import {useState} from "react";
import Tools from "../../Tools/Tools.js";
import PubSub from "pubsub-js";

export default  function SubmitModal (props){
    const TextArea = Input.TextArea;
    const {visible,setVisible} =props;
    const [fileName, setFileName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState(`if (sad() === true) {\n    sad().stop();\n    beAwesome();\n}`);
    const [loading, setLoading] = useState(false);


    function clearState(){
        setFileName("");
        setDescription("");
        setTags([]);
        setContent(`if (sad() === true) {\n    sad().stop();\n    beAwesome();\n}`);
    }

    function showNotification(type) {
        if(type==="warning"){
            Notification.warning({
                title: 'Warning',
                content: 'Please enter the file name and content!',
            });
        }
        else if (type === "success"){
            Notification.success({
                title: 'Success',
                content: 'Successfully created a new snippet!',
            });
        }

    }

    function useGPTFill(){
        //console.log(content)
        setLoading(true);
        Tools.chatGPT(content).then((res) => {
            const {filename,description,tags} = res;
            setFileName(filename);
            setDescription(description);
            setTags(tags);
            setLoading(false);
        });
    }

    function submitHandler(){
        //setVisible(false);


        let newTags = tags.map((tag) => {
            return  "#" + tag.trim() ;
        });

        let tagsStr = " [" + newTags.join(",") + "]";

        //console.log(fileName, description  + tagsStr, content)

        if (fileName === "" ||  content === ""){
            showNotification("warning");
            return;
        }

        Tools.createGist(fileName, description + tagsStr, content).then((res) => {
            console.log(res);
            clearState();
            setVisible(false);
            PubSub.publish('updateContentsData', { message: 'updateEditorData' });
            showNotification("success");
        });
    }

    function onCancelHandle(){
        setVisible(false);
        clearState();
    }

    return(

            <Modal
                title='New Snippet'
                visible={visible}
                onOk={submitHandler}
                onCancel={onCancelHandle}
                autoFocus={false}
                focusLock={true}
                okText='Submit'
                cancelText='Cancel'
                closable={false}
            >
                <MiniEditor code={content} setCode={setContent}/>
                <Input style={{ width: "100%", marginBottom: "10px",marginTop:"10px" }}
                       allowClear placeholder='Enter The File Name'
                       value={fileName}
                       onChange={setFileName}
                />
                <TextArea placeholder='Enter The Description'
                          style={{ minHeight: 64, width: "100%", marginBottom: "10px" }}
                          onChange={setDescription}
                          value={description}
                />
                <InputTag
                    allowClear
                    placeholder='Enter The Tags'
                    style={{ width: "100%"}}
                    onChange={setTags}
                    value={tags}
                />
                <div className={"gpt-img-con"}>
                    {
                        loading
                            ? <Spin/>
                            :  <img className={"gpt-img"} alt="gpt logo" src="src/assets/ChatGPT_logo.svg.png" onClick={useGPTFill} />
                    }

                </div>

            </Modal>

    )
}