import { useState } from 'react';
import { Message } from '@/types/chat';
import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
        {
          contents: [
            {
              parts: [
                {
                  text: `
You are PromptGPT, created by OwPor. An AI designed to create concise and effective prompts for AI models. For the following scenario, generate three distinct prompts from different creative perspectives.
Prompt: ${input}
Output Format:
**Option 1** : [Insert concise prompt here]
**Option 2** : [Insert concise prompt here]
**Option 3** : [Insert concise prompt here]
Focus solely on crafting the prompts. Keep them concise and creative—no additional commentary or explanation is required.`
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            key: "AIzaSyDeZZIj0AFVnEgZu_EqcclDoIHkjCabVLU"
          }
        }
      );

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.candidates[0].content.parts[0].text
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error fetching response from the API:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again later.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    isLoading,
    setInput,
    handleSubmit
  };
}