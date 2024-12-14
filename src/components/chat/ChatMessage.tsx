import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';
import { Card } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const formatPromptContent = (content: string) => {
    return content.replace(
      /\*\*(.*?)\*\*/g,
      '<span class="font-semibold text-primary">$1</span>'
    );
  };

  const renderContent = () => {
    if (message.role === 'assistant' && message.content.includes('**')) {
      return (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-lg font-semibold mb-2">{children}</h2>
              ),
              strong: ({ children }) => (
                <span className="font-semibold text-primary">{children}</span>
              ),
              code: ({ children }) => (
                <code className="bg-muted px-1 py-0.5 rounded">{children}</code>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      );
    }

    return (
      <div 
        className="text-sm text-muted-foreground break-words"
        dangerouslySetInnerHTML={{ 
          __html: formatPromptContent(message.content) 
        }}
      />
    );
  };

  return (
    <Card className={cn(
      "flex items-start gap-4 p-4 mb-4 hover:bg-accent/50 transition-colors",
      message.role === 'assistant' && "bg-primary/5"
    )}>
      <div className={cn(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border",
        message.role === 'assistant' 
          ? "bg-primary border-primary/50" 
          : "bg-muted"
      )}>
        {message.role === 'assistant' ? (
          <Bot className="h-4 w-4 text-primary-foreground" />
        ) : (
          <User className="h-4 w-4" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="text-sm font-medium">
          {message.role === 'assistant' ? 'PromptGPT' : 'You'}
        </div>
        {renderContent()}
      </div>
    </Card>
  );
}