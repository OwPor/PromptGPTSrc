import { Header } from '@/components/layout/Header';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { ChatInput } from '@/components/chat/ChatInput';
import { InfoSidebar } from '@/components/sidebar/InfoSidebar';
import { useChat } from '@/hooks/useChat';

function App() {
  const { messages, input, isLoading, setInput, handleSubmit } = useChat();

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background/95 to-background/90">
      <Header />
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <InfoSidebar onPromptClick={handlePromptClick} /> {/* Pass the function to the InfoSidebar */}
          <div className="flex flex-col space-y-4">
            <ChatWindow messages={messages} isLoading={isLoading} />
            <ChatInput
              input={input}
              isLoading={isLoading}
              onInputChange={setInput}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;