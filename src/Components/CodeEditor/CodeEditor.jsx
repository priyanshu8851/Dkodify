import React, { useState } from 'react'
import "./codeEditor.css"
import Editor from '@monaco-editor/react';


const CodeEditor = ({code,setCode, loading, explain }) => {
    const [lang,setLang]=useState("javascript");

    const handleChange= (value) =>{
        setCode(value);
    }
    const handleLang =(e)=>{
        setLang(e.target.value);
    }
    
    
    return (
        <>
                        <section className="main-editor-screen" aria-label="Code editor">
                        <div className="codeeditor">
                            <div className="editor-nav">
                                <select className="lang-select" onChange={(e)=>handleLang(e)}>
                                 
                                    <option value="javascript">JavaScript</option>
                                    <option value="cpp">C++</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                    <option value="c">C</option>
                                    <option value="html">HTML</option>
                                    <option value="css">CSS</option>
                                </select>

                                <button onClick={explain} disabled={loading || !code.trim()} className="explain-btn">
                                    {
                                        loading ? "Analyzing…" : "Explain code"
                                    }
                                </button>
                            </div>

                            <Editor height="62vh" language={lang} value={code} onChange={handleChange} theme="vs-dark" options={{ minimap: { enabled: false }, fontSize: 14, lineNumbersMinChars: 3, scrollBeyondLastLine: false, padding: { top: 16 } }} />
                        </div>
                        </section>
        </>
    )
}

export default CodeEditor
