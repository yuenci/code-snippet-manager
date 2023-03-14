import {Input, InputTag, Modal,Notification} from "@arco-design/web-react";
import MiniEditor from "../Editor/MiniEditor.jsx";
import {useState} from "react";
import Tools from "../Tools/Tools.js";
import PubSub from "pubsub-js";

export default  function SubmitModal (props){
    const TextArea = Input.TextArea;
    const {visible,setVisible} =props;
    const [fileName, setFileName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState("");

    function clearState(){
        setFileName("");
        setDescription("");
        setTags([]);
        setContent("");
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
        console.log("gpt")
        let res ={
            file_name : "1111",
            desc:"222",
            tagList :["aa","bb","cc"]
        }
        const {file_name, desc, tagList} = res;
        setFileName(file_name)
        setDescription(desc)
        setTags(tagList)
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

    return(
        <Modal
            title='New Snippet'
            visible={visible}
            onOk={submitHandler}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
            okText='Submit'
            cancelText='Cancel'
        >
            <MiniEditor setContent={setContent}/>
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
            <img className={"gpt-img"}  alt="gpt logo" src="src/assets/ChatGPT_logo.svg.png" onClick={useGPTFill} />
        </Modal>
    )
}