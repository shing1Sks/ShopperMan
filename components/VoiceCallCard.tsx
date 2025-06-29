import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import axios from "axios";

export default function VoiceCallCard({ productUrl }: { productUrl: string }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleStartCall = async () => {
    if (!phone.startsWith("+")) {
      setStatus(
        "Please enter a valid phone number with country code (e.g., +91...)"
      );
      return;
    }
    setLoading(true);
    setStatus("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/start-call`,
        {
          phone_number: phone,
          product_link: productUrl,
          user_doubt: "User has some questions about this product.",
        }
      );

      if (res.data?.success) {
        setStatus("✅ Call initiated! You'll receive a call shortly.");
      } else {
        setStatus("❌ Call could not be initiated. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Phone className="w-5 h-5 text-green-600" />
          <span>Voice Call</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Prefer talking? Start a voice call with our AI agent
        </p>
        {/* <p className="text-sm text-gray-500 mb-2">
          Prefer voice? Call our AI agent directly:{" "}
          <a href="tel:+12184538058" className="text-blue-600 underline">
            +1 (218) 453-8058
          </a>
        </p> */}

        <Input
          placeholder="Enter your number (e.g., +91...)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-3"
        />

        <Button
          onClick={handleStartCall}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          <Phone className="w-4 h-4 mr-2" />
          {loading ? "Calling..." : "Start Voice Call"}
        </Button>

        {status && (
          <p className="text-sm text-center mt-3 text-gray-700">{status}</p>
        )}
      </CardContent>
    </Card>
  );
}
