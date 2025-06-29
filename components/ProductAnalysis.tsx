import React from "react";
import {
  Star,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ImageIcon,
} from "lucide-react";

interface Alternative {
  title: string;
  price: string;
  rating: string;
  reason: string;
  link: string;
}

interface ProductData {
  title: string;
  price: string;
  rating: string;
  review_count: string;
  summary: string;
  pros: string[];
  cons: string[];
  recommendation: string;
  best_time_to_buy: string;
  alternatives: Alternative[];
  image?: string;
}

export default function ProductAnalysis({
  productData,
}: {
  productData?: ProductData;
}) {
  const mockProduct: ProductData = {
    title: "Wireless Bluetooth Headphones",
    price: "$89.99",
    rating: "4.3",
    review_count: "1247",
    summary: "Excellent sound quality and long battery life for the price.",
    pros: [
      "Excellent audio quality for the price range",
      "Long battery life (30+ hours)",
    ],
    cons: ["Build quality could be better"],
    recommendation:
      "This product offers great value and features for casual users.",
    best_time_to_buy: "Best prices expected around end-of-season sales.",
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    alternatives: [
      {
        title: "Sony WH-CH720N",
        price: "$99.99",
        rating: "4.5",
        reason: "Better noise cancellation",
        link: "#",
      },
      {
        title: "Audio-Technica ATH-M40x",
        price: "$79.99",
        rating: "4.6",
        reason: "Superior sound quality",
        link: "#",
      },
      {
        title: "Anker Soundcore Life Q30",
        price: "$69.99",
        rating: "4.4",
        reason: "Best value for money",
        link: "#",
      },
    ],
  };

  const data = productData ?? mockProduct;

  return (
    <section id="results" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AI Product Analysis
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive insights powered by advanced AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                {data.image && (
                  <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {data.title}
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl font-bold text-blue-600">
                      {data.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">{data.rating}</span>
                      <span className="text-gray-500">
                        ({data.review_count} reviews)
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{data.summary}</p>

                  {/* Pros */}
                  {data.pros.map((pro, idx) => (
                    <div className="flex items-center gap-2" key={idx}>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{pro}</span>
                    </div>
                  ))}

                  {/* Cons */}
                  {data.cons.map((con, idx) => (
                    <div className="flex items-center gap-2" key={idx}>
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <span className="text-gray-700">{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                AI Recommendations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">
                      AI Verdict
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    {data.recommendation}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">
                      Best Time to Buy
                    </span>
                  </div>
                  <p className="text-sm text-blue-700">
                    {data.best_time_to_buy}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Alternatives */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Smart Alternatives
              </h4>
              <div className="space-y-4">
                {data.alternatives.map((alt, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded" />
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 text-sm">
                        {alt.title}
                      </h5>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 font-semibold">
                          {alt.price}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">
                            {alt.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        {alt.reason}
                      </p>
                      <a
                        href={alt.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 underline"
                      >
                        View Product
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
