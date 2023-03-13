import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {useEffect, useState} from "react";
import PubSub from "pubsub-js";
import StatusContainer from "../Tools/StatusContainer.js";
import Tools from "../Tools/Tools.js";
export  default  function MainEditor(props){
    const {gist_id} = props;
    let content = props.content;

    if (!content) content = "";

    const [value, setValue] = useState(content);

    const  [height, setHeight] = useState(620);

    function handleResize() {
        setHeight(window.innerHeight - 150);
    }

    useEffect(() => {
        const subscription = PubSub.subscribe('codeValue', (msg, data) => {
            //console.log(data.message)
            setValue(data.message)
            StatusContainer.currentCodeContent = data.message;

            handleResize();
            window.addEventListener('resize', handleResize);
        });
        return () => {
            PubSub.unsubscribe(subscription);
            window.removeEventListener('resize', handleResize);
        }
    }, []);
    useEffect(() => {
        let currentGist = StatusContainer.ClearAllGistsData.find((item) => item.id === gist_id);
        if(currentGist === undefined) return;
        Tools.getRawContent(currentGist.files[0].raw_url).then(data => {
            //console.log(data)
            setValue(data)
            StatusContainer.currentCodeContent = data;
        });
    }, [gist_id]);

    return(
        <AceEditor
            width="100%"
            height={height +"px"}
            mode="javascript"
            theme="github"
            name="blah1"
            // onLoad={onLoad}
            // onChange={onChange}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={value}
            wrapEnabled={true}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
            }}/>
    )
}