"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart,
  MessageCircle,
  Phone,
  Search,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  Bot,
  Headphones,
  UserCheck,
  LifeBuoy,
  Link,
  Sparkles,
} from "lucide-react";
import { useChat } from "ai/react";
import ProductAnalysis from "@/components/ProductAnalysis";
import VoiceCallCard from "@/components/VoiceCallCard";
import ChatTab from "../components/ChatTab";
import ConciergeTab from "@/components/ConciergeTab";

export default function ShopperManApp() {
  const [productUrl, setProductUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [productData, setProductData] = useState(null);

  const dummyOrders = [
    { id: "12345", name: "iPhone 15 Pro Max" },
    { id: "12346", name: "MacBook Air M3" },
    { id: "12347", name: "Sony WH-1000XM5 Headphones" },
  ];

  const [supportStep, setSupportStep] = useState<
    "idle" | "select" | "issue" | "submitted"
  >("idle");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [issueText, setIssueText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });

  const handleAnalyze = async () => {
    if (!productUrl.trim()) return;

    setIsAnalyzing(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: productUrl }),
      });

      const json = await res.json();
      console.log("Analysis:", json);
      setProductData(json.summary);
    } catch (error) {
      console.error("Analyze error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ShopperMan
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                Trusted by 50K+ shoppers
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Shop Smarter with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                AI
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Paste any product link and get instant AI-powered analysis,
              alternatives, and personal shopping assistance. Experience
              shopping that's <strong>10x better</strong> than traditional
              methods.
            </p>

            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="url"
                    placeholder="Paste your product link here..."
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  />
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={!productUrl.trim() || isAnalyzing}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isAnalyzing ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      <span>Analyze</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="bg-green-100 p-3 rounded-lg w-fit mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  10x Better Experience
                </h3>
                <p className="text-gray-600 text-sm">
                  Pre and post-sales support that transforms your shopping
                  journey
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="bg-blue-100 p-3 rounded-lg w-fit mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  AI-Powered Analysis
                </h3>
                <p className="text-gray-600 text-sm">
                  Smart product summaries and intelligent alternatives discovery
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="bg-purple-100 p-3 rounded-lg w-fit mx-auto mb-4">
                  <Search className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Personal Concierge
                </h3>
                <p className="text-gray-600 text-sm">
                  Automated seller contact and custom needs handling
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductAnalysis productData={productData} />

      {/* Main App Interface */}
      <section className="py-12 px-4">
        <div className="container min-h-[550px] mx-auto max-w-6xl">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {/* <TabsTrigger
                value="analysis"
                className="flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Product Analysis</span>
              </TabsTrigger> */}
              <TabsTrigger value="chat" className="flex items-center space-x-2">
                <Bot className="w-4 h-4" />
                <span>AI Agent</span>
              </TabsTrigger>
              <TabsTrigger
                value="concierge"
                className="flex items-center space-x-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Concierge</span>
              </TabsTrigger>
              <TabsTrigger
                value="support"
                className="flex items-center space-x-2"
              >
                <LifeBuoy className="w-4 h-4" />
                <span>Post-Sales</span>
              </TabsTrigger>
            </TabsList>

            {/* Product Analysis Tab
            <TabsContent value="analysis" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="w-5 h-5 text-blue-600" />
                    <span>Smart Product Analysis</span>
                  </CardTitle>
                  <CardDescription>
                    Paste any product link to get instant AI-powered analysis,
                    alternatives, and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Paste product URL here (Amazon, eBay, etc.)"
                      value={productUrl}
                      onChange={(e) => setProductUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleProductAnalysis}
                      disabled={isAnalyzing || !productUrl.trim()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Analyze
                        </>
                      )}
                    </Button>
                  </div>

                  {productData && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {productData.name}
                          </CardTitle>
                          <div className="flex items-center space-x-4">
                            <span className="text-2xl font-bold text-green-600">
                              {productData.price}
                            </span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="ml-1 font-medium">
                                {productData.rating}
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4">
                            {productData.summary}
                          </p>
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium text-green-600 mb-2">
                                Pros:
                              </h4>
                              <ul className="space-y-1">
                                {productData.pros.map((pro, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center text-sm"
                                  >
                                    <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                                    {pro}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-red-600 mb-2">
                                Cons:
                              </h4>
                              <ul className="space-y-1">
                                {productData.cons.map((con, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center text-sm"
                                  >
                                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                    {con}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Smart Alternatives
                          </CardTitle>
                          <CardDescription>
                            Similar products you might consider
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {productData.alternatives.map((alt, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 border rounded-lg"
                            >
                              <div>
                                <h5 className="font-medium">{alt.name}</h5>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-green-600 font-medium">
                                    {alt.price}
                                  </span>
                                  <div className="flex items-center">
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <span className="text-sm ml-1">
                                      {alt.rating}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Compare
                              </Button>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent> */}

            {/* AI Agent Chat Tab */}
            <TabsContent value="chat" className="space-y-6">
              <ChatTab
                productSummary={
                  productData?.summary || "Wireless Bluetooth Headphones"
                }
                productUrl={productUrl}
              />
            </TabsContent>

            {/* Private Concierge Tab */}
            <TabsContent value="concierge" className="space-y-6">
              <ConciergeTab />
            </TabsContent>

            {/* Post-Sales Support Tab */}
            <TabsContent value="support" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LifeBuoy className="w-5 h-5 text-green-600" />
                    <span>Automated Post-Sales Support</span>
                  </CardTitle>
                  <CardDescription>
                    We automatically track your purchases and handle post-sales
                    communications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Order Tracking
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <h5 className="font-medium">iPhone 15 Pro Max</h5>
                              <p className="text-sm text-gray-600">
                                Order #12345
                              </p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              Delivered
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <h5 className="font-medium">MacBook Air M3</h5>
                              <p className="text-sm text-gray-600">
                                Order #12346
                              </p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800">
                              In Transit
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Automated Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center p-3 border rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                            <div>
                              <h5 className="font-medium text-sm">
                                Warranty Registration
                              </h5>
                              <p className="text-xs text-gray-600">
                                Automatically registered your iPhone
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 border rounded-lg">
                            <Clock className="w-5 h-5 text-yellow-500 mr-3" />
                            <div>
                              <h5 className="font-medium text-sm">
                                Return Window Alert
                              </h5>
                              <p className="text-xs text-gray-600">
                                3 days left to return MacBook
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 border rounded-lg">
                            <Headphones className="w-5 h-5 text-blue-500 mr-3" />
                            <div>
                              <h5 className="font-medium text-sm">
                                Support Contact
                              </h5>
                              <p className="text-xs text-gray-600">
                                Found support contacts for all items
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Support Requests
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {supportStep === "idle" && (
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium">
                              Need help with a purchase?
                            </h5>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => setSupportStep("select")}
                            >
                              <LifeBuoy className="w-4 h-4 mr-2" />
                              Get Support
                            </Button>
                          </div>
                        )}

                        {supportStep === "select" && (
                          <div className="space-y-4">
                            <label className="text-sm font-medium">
                              Select a product
                            </label>
                            <select
                              className="w-full border rounded p-2"
                              value={selectedItem ?? ""}
                              onChange={(e) => setSelectedItem(e.target.value)}
                            >
                              <option value="">-- Select --</option>
                              {dummyOrders.map((item) => (
                                <option key={item.id} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            {selectedItem && (
                              <Button
                                onClick={() => setSupportStep("issue")}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Next
                              </Button>
                            )}
                          </div>
                        )}

                        {supportStep === "issue" && (
                          <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                              Describe your issue with{" "}
                              <strong>{selectedItem}</strong>
                            </p>
                            <textarea
                              className="w-full h-24 border rounded p-2"
                              value={issueText}
                              onChange={(e) => setIssueText(e.target.value)}
                              placeholder="Explain what's wrong, e.g. 'Device won't turn on'"
                            />
                            <Button
                              disabled={!issueText.trim() || isSubmitting}
                              onClick={async () => {
                                setIsSubmitting(true);
                                try {
                                  await fetch(
                                    `${process.env.NEXT_PUBLIC_API_URL}/concierge`,
                                    {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        custom_need: `Support request for ${selectedItem}: ${issueText}`,
                                        budget_range: "N/A",
                                        timeline:
                                          "Urgent support needed for selected order",
                                      }),
                                    }
                                  );
                                  setSupportStep("submitted");
                                } catch (err) {
                                  alert(
                                    "Support request failed. Please try again."
                                  );
                                } finally {
                                  setIsSubmitting(false);
                                }
                              }}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              {isSubmitting
                                ? "Submitting..."
                                : "Initiate Support"}
                            </Button>
                          </div>
                        )}

                        {supportStep === "submitted" && (
                          <div className="p-3 border rounded-lg bg-green-50 text-green-700">
                            ✅ Your support request has been sent. Our AI
                            concierge is on it!
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white flex items-center justify-center w-full px-5 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">ShopperMan</h3>
              </div>
              <p className="text-gray-400">
                Your intelligent shopping companion for smarter purchasing
                decisions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Product Analysis</li>
                <li>AI Chat Support</li>
                <li>Price Comparison</li>
                <li>Smart Recommendations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Private Concierge</li>
                <li>Post-Sales Support</li>
                <li>Automated Communications</li>
                <li>Order Tracking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Coming Soon</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Chrome Extension</li>
                <li>Mobile App</li>
                <li>API Access</li>
                <li>Enterprise Solutions</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 ShopperMan. All rights reserved. Built with AI for
              smarter shopping.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
