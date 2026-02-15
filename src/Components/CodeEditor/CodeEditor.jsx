import React, { useState } from 'react'
import "./codeEditor.css"
import Editor from '@monaco-editor/react';


const CodeEditor = ({code,setCode, loading, explain }) => {
    const [lang,setLang]=useState("javascript");

    const handleChange= (value) =>{
        setCode(value);
        console.log(code)
    }
    const handleLang =(e)=>{
        setLang(e.target.value);
    }
    
    
    return (
        <>
            <div className="main-editor-screen">

                        <div className="codeeditor">
                            <div className="editor-nav">
                                <select className="lang-select" onChange={(e)=>handleLang(e)}>
                                 
                                    <option value="javascript" defaultChecked={true}>JavaScript</option>
                                    <option value="cpp">C++</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                    <option value="c">C</option>
                                    <option value="html">HTML</option>
                                    <option value="css">CSS</option>
                                </select>

                                <button onClick={explain} disabled={loading ? true : false} className="explain-btn">
                                    {
                                        loading ? "Anaylsing....." : "Explain Code"
                                    }
                                </button>
                            </div>

                            <Editor height="60vh" language={lang} value={code}  onChange={handleChange} />;
                        </div>

                    </div>
        </>
    )
}

export default CodeEditor
