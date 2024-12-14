import { Send, Wand2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ChatInput({ input, isLoading, onInputChange, onSubmit }: ChatInputProps) {
  return (
    <Card className="p-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Wand2 className="h-4 w-4" />
          <span>Pro tip: Be specific and detailed in your prompts for better results</span>
        </div>
        <div className="flex gap-2">
          <Textarea
            placeholder="Craft your prompt here... (e.g., 'Write a creative story about a time traveler')"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <Button type="submit" className="px-8" disabled={isLoading}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </form>
    </Card>
  );
}