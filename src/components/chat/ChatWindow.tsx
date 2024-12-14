import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from './ChatMessage';
import { Message } from '@/types/chat';
import { Card } from "@/components/ui/card";
import { Loader2, Bot } from "lucide-react";

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  return (
    <Card className="relative">
      <ScrollArea className="h-[calc(100vh-20rem)] p-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Bot className="h-12 w-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-2">Welcome to Gemini Chat</h2>
            <p className="text-muted-foreground max-w-md">
              Your AI-powered assistant. Start by typing a message below to begin our conversation.
            </p>
          </div>
        )}
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}