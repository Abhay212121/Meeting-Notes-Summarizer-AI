import { Bot } from "lucide-react";
import { MeetingSummaryForm } from "./components/MeetingSummaryForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="text-center py-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div
              className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 
                 rounded-xl flex items-center justify-center shadow-md"
              aria-hidden="true"
            >
              <Bot className="w-5 h-5 text-white md:w-6 md:h-6" />
            </div>
            <h1
              className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 
                 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700"
            >
              AI Meeting Notes Summarizer
            </h1>
          </div>
        </header>
        <MeetingSummaryForm />
      </div>
    </div>
  );
}

export default App;
