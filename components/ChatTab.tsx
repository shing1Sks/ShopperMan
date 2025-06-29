"use client";

import { useState } from "react";
import axios from "axios";
import { MessageCircle, Bot, Search, Star, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VoiceCallCard from "@/components/VoiceCallCard";

type Message = {
  id: string;
  role: "user" | "model";
  content: string;
};

interface ChatTabProps {
  productSummary: string;
  productUrl: string;
}

export default function ChatTab({ productSummary, productUrl }: ChatTabProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        messages: updatedMessages,
        product_summary: productSummary,
      });

      const aiReply: Message = {
        id: crypto.randomUUID(),
        role: "model",
        content: res.data.reply,
      };

      setMessages([...updatedMessages, aiReply]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        messages: updatedMessages,
        product_summary: productSummary,
      });

      const aiReply: Message = {
        id: crypto.randomUUID(),
        role: "model",
        content: res.data.reply,
      };

      setMessages([...updatedMessages, aiReply]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <span>Chat with AI Shopping Assistant</span>
            </CardTitle>
            <CardDescription>
              Get instant answers about products, comparisons, and shopping
              advice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 border rounded-lg p-4 overflow-y-auto mb-4 bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                  <Bot className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>
                    Hi! I'm your AI shopping assistant. Ask me anything about
                    products!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-white border shadow-sm"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about products, prices, comparisons..."
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Send
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <VoiceCallCard productUrl={productUrl} />

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => sendMessage("Find me similar products to this.")}
              >
                <Search className="w-4 h-4 mr-2" />
                Find similar products
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() =>
                  sendMessage("Can you do a price comparison for this product?")
                }
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Price comparison
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() =>
                  sendMessage("What do customers say about this product?")
                }
              >
                <Star className="w-4 h-4 mr-2" />
                Check reviews
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
