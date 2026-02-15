import './App.css'
import CodeEditor from './Components/CodeEditor/CodeEditor'
import Header from './Components/Header/Header'
import Chatbox from './Components/ChatBot/chatBox'
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
      const response = await fetch(import.meta.env.VITE_API_URL, {
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

      const data = await response.json()

      if (response.status === 429) {
        setChatResponse("Quota exceeded. Please wait a minute.")
        return
      }

      if (data.candidates?.length > 0) {
        setChatResponse(data.candidates[0].content.parts[0].text)
      } else {
        setChatResponse("No explanation generated.")
      }
    } catch (error) {
      console.error(error)
      setChatResponse("Error connecting to AI Agent.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="main">
        <div className="container">
          <CodeEditor
            code={code}
            setCode={setCode}
            explain={explainCode}
            loading={isLoading}
          />
          <Chatbox response={chatResponse} loading={isLoading} question={question} setQuestion={setQuestion}/>
        </div>
      </div>
    </>
  )
}

export default App
