import React from "react";
import {
  Star,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function ProductAnalysis() {
  const mockProduct = {
    name: "Wireless Bluetooth Headphones",
    price: "$89.99",
    rating: 4.3,
    reviews: 1247,
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
  };

  const alternatives = [
    {
      name: "Sony WH-CH720N",
      price: "$99.99",
      rating: 4.5,
      discount: "Better noise cancellation",
      image:
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    {
      name: "Audio-Technica ATH-M40x",
      price: "$79.99",
      rating: 4.6,
      discount: "Superior sound quality",
      image:
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    {
      name: "Anker Soundcore Life Q30",
      price: "$69.99",
      rating: 4.4,
      discount: "Best value for money",
      image:
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
  ];

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
          {/* Main Product Analysis */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={mockProduct.image}
                  alt={mockProduct.name}
                  className="w-full sm:w-48 h-48 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {mockProduct.name}
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl font-bold text-blue-600">
                      {mockProduct.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">
                        {mockProduct.rating}
                      </span>
                      <span className="text-gray-500">
                        ({mockProduct.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">
                        Excellent audio quality for the price range
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">
                        Long battery life (30+ hours)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <span className="text-gray-700">
                        Build quality could be better
                      </span>
                    </div>
                  </div>
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
                      Strong Buy
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    Price is 15% below market average
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
                    Prices historically lowest this month
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
                {alternatives.map((alt, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={alt.image}
                      alt={alt.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 text-sm">
                        {alt.name}
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
                        {alt.discount}
                      </p>
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
