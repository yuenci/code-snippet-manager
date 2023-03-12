import AceEditor from "react-ace";
import "./Editor.css";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

export default function Sidebar() {
    function onChange(newValue) {
        console.log("change", newValue);
    }

    function onLoad() {
        //editor.focus();
        console.log("i've loaded");
    }
    return (
        <div className="editor" >
            <div>
                <div>Title</div>
                <div>Description</div>
                <div>Tags</div>
                <div>DateTimes</div>
            </div>
            <AceEditor
                width="100%"
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
                value={`function onLoad(editor) {
  console.log("i've loaded");
}`}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }}/>
        </div>
    )
}