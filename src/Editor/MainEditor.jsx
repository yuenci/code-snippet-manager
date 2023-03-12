import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {useEffect, useState} from "react";
import PubSub from "pubsub-js";
export  default  function MainEditor(){
    const [value, setValue] = useState(`function onLoad(editor) {
  console.log("i've loaded");
}`);
    useEffect(() => {
        const subscription = PubSub.subscribe('codeValue', (msg, data) => {
            setValue(data.message)
        });
        return () => PubSub.unsubscribe(subscription);
    }, []);
    function onChange(newValue) {
        //console.log("change", newValue);
    }

    function onLoad() {
        //editor.focus();
        console.log("i've loaded");
    }
    return(
        <AceEditor
            width="100%"
            height="620px"
            placeholder="Placeholder Text"
            mode="javascript"
            theme="github"
            name="blah2"
            onLoad={onLoad}
            onChange={onChange}
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