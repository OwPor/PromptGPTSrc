import { Bot, User, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';
import { Card } from "@/components/ui/card";
import { useState } from 'react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const formatPromptContent = (content: string) => {
    return content.replace(
      /\*\*(.*?)\*\*/g,
      '<span class="font-semibold text-primary">$1</span>'
    );
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const renderOptions = () => {
    const options = message.content.split('\n').filter(option => option.trim() !== '');

    return options.map((option, index) => {
      const [label, value] = option.split(':');
      const trimmedValue = value ? value.trim() : label.trim();

      return (
        <div key={index} className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground break-words flex-1 pr-2"> {/* Added flex-1 to allow text to take available space */}
            <span dangerouslySetInnerHTML={{ __html: formatPromptContent(option) }} />
          </div>
          <button 
            onClick={() => handleCopy(trimmedValue, index)} 
            className="ml-2 inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-purple-600 text-white hover:bg-purple-700 h-10 w-10 min-w-[40px]" // Set a minimum width
          >
            {copiedIndex === index ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      );
    });
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
        {renderOptions()}
      </div>
    </Card>
  );
}