import { FaLocationArrow } from "react-icons/fa"
import "./chatbox.css"

const Chatbox = ({ response, loading, question, setQuestion, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!loading) onSubmit()
  }

  return (
    <section className="chatbox" aria-label="Code explanation">
      <header className="chat-heading">
        <h2>Explanation</h2>
        <p>Your code, unpacked into clear and practical steps.</p>
      </header>
      <div className="chat-area" aria-live="polite" aria-busy={loading}>
        {loading ? (
          <div className="chat-loading"><span className="loading-dot" /> Gemini is thinking…</div>
        ) : response ? (
          response
        ) : (
          <div className="chat-empty">
            <div className="chat-empty-icon" aria-hidden="true">✳</div>
            <strong>Ready when you are</strong>
            <span>Write or paste code, then select “Explain code” to get started.</span>
          </div>
        )}
      </div>
      <form className="chat-inp" onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about your code… (optional)"
          aria-label="Optional question about your code"
        />
        <button className="chat-inp-btn" type="submit" disabled={loading} aria-label="Explain code">
          <FaLocationArrow />
        </button>
      </form>
      <p className="chat-footnote">Powered by Gemini. Free API limits may occasionally delay a response.</p>
    </section>
  )
}

export default Chatbox
