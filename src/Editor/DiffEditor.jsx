import { diff as DiffsEditor } from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { useEffect, useState} from "react";
//import PubSub from "pubsub-js";
import "./Editor.css"
import PubSub from "pubsub-js";
export  default  function DiffEditor(props){
    let content = props.content;
    if (!content) content = ["111","2222"];

    //console.log("render diff editor", content)

    const [value, setValue] = useState(content);

    const  [height, setHeight] = useState(getHeight());

    const [key, setKey] = useState(Math.random());

    let resizeTimer;

    function getHeight() {
        return window.innerHeight - 150;
    }

    function doSomethingAfterResize() {
        console.log("Resize ended");
        setKey(Math.random());
        setHeight(getHeight());
    }

    function setTimer() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(doSomethingAfterResize, 250); // 250 毫秒之后执行
    }

    useEffect(() => {

        window.addEventListener('resize', setTimer);
        const subscription = PubSub.subscribe('updateDiffEditor', (msg, data) => {
            //console.log(data.message);
            setValue(data.message);
        });

        return () => {
            window.removeEventListener('resize', setTimer);
            PubSub.unsubscribe(subscription);
        };
    }, []); // 空数组表示仅在挂载和卸载时执行一次

    function onChange(newValue) {
        setValue(newValue)
    }

    return(
        <DiffsEditor
            key={key}
            value={value}
            height={height +"px"}
            width="100%"
            mode="text"
            name="blah2"
            theme="github"
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            wrapEnabled={true}
            onChange={onChange}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
            }}
        />

    )
}