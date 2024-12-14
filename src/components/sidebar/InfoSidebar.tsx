// InfoSidebar.tsx
import { Sparkles, Wand2, Code2, MessageSquare } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const EXAMPLE_PROMPTS = [
  "Write a creative story about a time traveler",
  "Explain quantum computing to a 5-year-old",
  "Generate Python code for a simple web scraper",
  "Create a marketing strategy for a new product"
];

interface InfoSidebarProps {
  onPromptClick: (prompt: string) => void; // Prop for handling prompt clicks
}

export function InfoSidebar({ onPromptClick }: InfoSidebarProps) {
  return (
    <div className="flex flex-col space-y-4">
      <Card className="p-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Prompt Engineering Hub</h2>
        </div>
        <Separator className="my-3" />
        <p className="text-sm text-muted-foreground mb-4">
          Craft powerful prompts using our advanced AI. Perfect for content creation,
          coding assistance, and creative writing.
        </p>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-primary" />
            <span className="text-sm">Advanced prompt optimization</span>
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary" />
            <span className="text-sm">Code-aware responses</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <span className="text-sm">Natural conversation flow</span>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Example Prompts</h3>
        <div className="grid gap-2">
          {EXAMPLE_PROMPTS.map((prompt, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto w-full py-2 px-3 justify-start text-sm font-normal whitespace-normal text-left break-words"
              onClick={() => onPromptClick(prompt)} // Call the prop function on click
            >
              {prompt}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}