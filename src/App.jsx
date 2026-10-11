import './App.css'
import CodeEditor from './Components/CodeEditor/CodeEditor'
import Header from './Components/Header/Header'
import Chatbox from './Components/ChatBot/ChatBox'
import { useState } from 'react'

function App() {
  const [code, setCode] = useState("// Add your code here")
  const [chatResponse, setChatResponse] = useState("")
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const explainCode = async () => {
    setIsLoading(true)
    setChatResponse("")

    try {
      const apiUrl = import.meta.env.VITE_API_URL
      if (!apiUrl) {
        setChatResponse("The AI service isn't configured yet. Please try again later.")
        return
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Your name is "Decodify".
Explain the following code clearly and logically.

User Question:
${question || "Hi!"}

Code:
${code}
                  `,
                },
              ],
            },
          ],
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (response.status === 429) {
        setChatResponse("Sorry, I couldn't get an explanation just now. The free Gemini API has a request limit, so it may be temporarily out of quota. Please wait a little and try again. Apologies for the interruption!")
        return
      }

      if (!response.ok) {
        setChatResponse("Sorry, the Gemini service didn't respond successfully. It may be temporarily unavailable—please try again shortly. Apologies for the interruption!")
        return
      }

      const explanation = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n").trim()
      if (explanation) {
        setChatResponse(explanation)
      } else {
        setChatResponse("Sorry, Gemini returned an empty response. Please try again in a moment. Apologies for the interruption!")
      }
    } catch (error) {
      console.error(error)
      setChatResponse("Sorry, I couldn't reach the Gemini API. The free service can occasionally be busy or temporarily unavailable. Please try again shortly—apologies for the interruption!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-shell">
      <Header />
      <div className="main">
        <section className="page-intro">
          <span className="eyebrow">AI code companion</span>
          <h1>Make code make sense.</h1>
          <p>Paste or write code, choose its language, and get a clear, step-by-step explanation powered by Gemini. Ask a follow-up question whenever you need a closer look.</p>
        </section>
        <div className="container">
          <CodeEditor
            code={code}
            setCode={setCode}
            explain={explainCode}
            loading={isLoading}
          />
          <Chatbox response={chatResponse} loading={isLoading} question={question} setQuestion={setQuestion} onSubmit={explainCode}/>
        </div>
      </div>
      <footer className="site-footer">Created by <a href="https://priyanshukashyap.netlify.app" target="_blank" rel="noreferrer">Priyanshu</a></footer>
    </div>
  )
}

export default App
