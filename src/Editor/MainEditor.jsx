import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {useEffect, useState} from "react";
import PubSub from "pubsub-js";
export  default  function MainEditor(){
//     const [value, setValue] = useState(`function onLoad(editor) {
//   console.log("i've loaded");
// }`);
    const [value, setValue] = useState("");

    const  [height, setHeight] = useState(620);

    useEffect(() => {
        const subscription = PubSub.subscribe('codeValue', (msg, data) => {
            console.log(data.message)
            setValue(data.message)
        });
        return () => PubSub.unsubscribe(subscription);
    }, []);
    useEffect(() => {
        function handleResize() {
            setHeight(window.innerHeight - 150);
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // 空数组表示仅在挂载和卸载时执行一次

    return(
        <AceEditor
            width="100%"
            height={height +"px"}
            mode="javascript"
            theme="github"
            name="blah2"
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