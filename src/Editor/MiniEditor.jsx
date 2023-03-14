import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import  './MiniEditor.css' ;

export  default  function MiniEditor(props) {
    const {code, setCode} = props;
    const style = {
        backgroundColor : "#f2f3f5",
        overflow: "auto",
        maxHeight: "400px",
    }

    function onChangeHandler(e){
        //console.log(e.target.value)
        setCode(e.target.value);
    }


    return (
        <div style={style} className={"mini__editor__container"}>
            <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => highlight(code, languages.js)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                }}
                onChange={onChangeHandler}
            />
        </div>
    );
}