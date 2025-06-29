"use client";

import { useState } from "react";
import axios from "axios";
import { UserCheck, CheckCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";

export default function ConciergeTab() {
  const [customNeed, setCustomNeed] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [timeline, setTimeline] = useState("");
  const [requests, setRequests] = useState([
    {
      title: "Custom laptop configuration",
      subtitle: "Negotiating with 3 sellers",
      status: "In Progress",
    },
    {
      title: "Bulk office chairs order",
      subtitle: "Awaiting quotes",
      status: "Pending",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!customNeed.trim()) return;

    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/concierge`, {
        custom_need: customNeed,
        budget_range: budgetRange,
        timeline,
      });

      // Update Active Requests UI
      setRequests([
        {
          title: customNeed,
          subtitle: "We're reaching out to sellers...",
          status: "In Progress",
        },
        ...requests,
      ]);

      // Clear inputs
      setCustomNeed("");
      setBudgetRange("");
      setTimeline("");
    } catch (err) {
      console.error("Concierge request failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TabsContent value="concierge" className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-purple-600" />
            <span>Private Shopping Concierge</span>
          </CardTitle>
          <CardDescription>
            Let our AI handle seller communications and custom requests for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Automated Seller Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Automated Seller Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  We'll automatically reach out to sellers on your behalf for:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Price negotiations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Custom specifications
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Bulk order inquiries
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Shipping arrangements
                  </li>
                </ul>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled
                >
                  Set Up Concierge
                </Button>
              </CardContent>
            </Card>

            {/* Custom Request Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Custom Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Submit special requests and we'll handle the legwork:
                </p>
                <div className="space-y-3">
                  <Input
                    placeholder="Describe your custom need..."
                    value={customNeed}
                    onChange={(e) => setCustomNeed(e.target.value)}
                  />
                  <Input
                    placeholder="Budget range (optional)"
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                  />
                  <Input
                    placeholder="Timeline requirements"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-purple-600"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Active Requests */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Active Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {requests.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <h5 className="font-medium">{r.title}</h5>
                      <p className="text-sm text-gray-600">{r.subtitle}</p>
                    </div>
                    <Badge
                      className={`${
                        r.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {r.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
