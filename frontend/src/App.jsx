import { useState } from 'react'
// import { getAnswer } from "./langchain"

export default function App() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([])
  const [answer, setAnswer] = useState("");

  async function handleSubmitQuestion(input) {
    let result = ''
    
    try {
      console.log({ input })
      // result = await getAnswer(question);
      result = input
      setAnswer(result);
      setMessages([...messages, { text: question, isUser: true }, { text: result, isUser: false }])
    } catch (e) {
      console.error(e)
    }

    return result
  }

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      <div className="flex max-w-full flex-1 flex-col">
        <div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
          <div className="flex-1 overflow-hidden dark:bg-iso-dark-gray">
            <h1 className="text-2xl sm:text-4xl font-semibold text-center text-iso-yellow dark:text-iso-yellow flex gap-4 p-4 items-center justify-center">
              ThorGPT
            </h1>
            <div className="h-4/5 overflow-auto">
              <div className="h-full flex flex-col items-start text-sm dark:bg-iso-dark-gray">
                {messages.map((message, i) => (
                  <div
                    key={`${message.text}${i}`}
                    className={`max-w-xl mx-auto flex flex-col items-${
                      message.isUser ? 'end' : 'start'
                    } text-sm ${
                      message.isUser
                        ? 'border-2 border-iso-yellow text-right dark:text-white font-bold bg-transparent'
                        : 'border-2 border-iso-blue text-left dark:text-white font-bold bg-transparent'
                    } p-2 m-2 rounded-lg`}
                  >
                    <p>{message.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-iso-gray bg-iso-gray dark:bg-iso-gray md:!bg-transparent dark:md:bg-iso-gray pt-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitQuestion(question);
                setQuestion('');
              }}
              className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
            >
              <div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
                <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-iso-gray dark:border-gray-900/50 dark:text-white dark:bg-iso-gray rounded-md">
                  <textarea
                    value={question}
                    tabIndex={0}
                    data-id="root"
                    placeholder="Send a message..."
                    className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0"
                    onChange={(e) => setQuestion(e.currentTarget.value)}
                  ></textarea>
                  <button className="absolute p-1 rounded-md bottom-1.5 md:bottom-2.5 bg-transparent disabled:bg-iso-dark-gray right-1 md:right-2 disabled:opacity-40">
                    &#11157;
                  </button>
                </div>
              </div>
            </form>
            <div className="px-3 pt-2 pb-3 text-center text-xs text-black dark:text-white md:px-4 md:pt-3 md:pb-6">
              <span>
                The responses may include inaccurate information about people,
                places, or facts.
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
