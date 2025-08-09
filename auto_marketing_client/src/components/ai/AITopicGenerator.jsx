import React, { useState, useEffect } from "react";
import { X, Wand2, Sparkles } from "lucide-react";

const AITopicGenerator = ({ isOpen, onClose, onGenerate, campaigns }) => {
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [generating, setGenerating] = useState(false);
  const [topicsCount, setTopicsCount] = useState(10);
  const [aiSettings, setAiSettings] = useState({
    creativity: "balanced", // conservative, balanced, creative
    contentStyle: "professional", // casual, professional, creative
    targetAudience: "general", // specific, general, broad
    includeHashtags: true,
    includeImages: true,
  });

  const creativityOptions = [
    {
      value: "conservative",
      label: "Bảo thủ",
      description: "An toàn, chuyên nghiệp",
    },
    {
      value: "balanced",
      label: "Cân bằng",
      description: "Vừa an toàn vừa sáng tạo",
    },
    { value: "creative", label: "Sáng tạo", description: "Táo bạo, độc đáo" },
  ];

  const styleOptions = [
    { value: "casual", label: "Thân thiện", description: "Gần gũi, dễ hiểu" },
    {
      value: "professional",
      label: "Chuyên nghiệp",
      description: "Trang trọng, uy tín",
    },
    { value: "creative", label: "Sáng tạo", description: "Độc đáo, thu hút" },
  ];

  const handleGenerate = async () => {
    if (!selectedCampaign) return;

    setGenerating(true);

    // Simulate AI generation process
    const steps = [
      "Phân tích dữ liệu chiến dịch...",
      "Nghiên cứu xu hướng thị trường...",
      "Tạo các chủ đề phù hợp...",
      "Tối ưu hóa nội dung...",
      "Hoàn thành!",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // Call parent function with generated data
    const generatedTopics = await generateTopicsForCampaign(selectedCampaign);
    onGenerate(generatedTopics);

    setGenerating(false);
    onClose();
  };

  const generateTopicsForCampaign = async (campaignId) => {
    // Mock AI generation - in real app, this would call AI API
    const campaign = campaigns.find((c) => c.id.toString() === campaignId);
    const baseTopics = [
      {
        title: `${campaign.name} - Giới thiệu sản phẩm`,
        description: `Giới thiệu các sản phẩm chính trong chiến dịch ${campaign.name}`,
        category: "Product",
      },
      {
        title: `${campaign.name} - Khuyến mãi đặc biệt`,
        description: `Các chương trình khuyến mãi hấp dẫn trong ${campaign.name}`,
        category: "Promotion",
      },
      {
        title: `${campaign.name} - Customer Stories`,
        description: `Chia sẻ câu chuyện khách hàng về ${campaign.name}`,
        category: "Social Proof",
      },
      {
        title: `${campaign.name} - Behind the Scenes`,
        description: `Hậu trường và quy trình sản xuất cho ${campaign.name}`,
        category: "Branding",
      },
      {
        title: `${campaign.name} - Tips & Tricks`,
        description: `Mẹo và hướng dẫn sử dụng liên quan đến ${campaign.name}`,
        category: "Education",
      },
      {
        title: `${campaign.name} - Xu hướng mới`,
        description: `Cập nhật xu hướng và tin tức mới nhất`,
        category: "Trending",
      },
      {
        title: `${campaign.name} - So sánh sản phẩm`,
        description: `So sánh ưu điểm của sản phẩm với đối thủ`,
        category: "Comparison",
      },
      {
        title: `${campaign.name} - Hướng dẫn sử dụng`,
        description: `Hướng dẫn chi tiết cách sử dụng sản phẩm`,
        category: "Tutorial",
      },
    ];

    return baseTopics.slice(0, topicsCount).map((topic, index) => ({
      id: Date.now() + index,
      ...topic,
      campaignId: parseInt(campaignId),
      campaignName: campaign.name,
      posts: 0, // Chưa có content nào
      pendingPosts: 0,
      publishedPosts: 0,
      engagement: "0",
      status: "needs_content", // Cần tạo nội dung
      aiGenerated: true,
      createdDate: new Date().toISOString().split("T")[0],
      platforms: campaign.platforms || ["Facebook", "Instagram"],
      targetKeywords: [],
      aiSettings: aiSettings,
    }));
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save original values
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalBodyMargin = document.body.style.margin;
      const originalBodyPadding = document.body.style.padding;

      // Apply modal styles
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.margin = "0";
      document.body.style.padding = "0";
      document.body.style.height = "100vh";
      document.body.style.width = "100vw";

      return () => {
        // Restore original values
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.margin = originalBodyMargin;
        document.body.style.padding = originalBodyPadding;
        document.body.style.height = "";
        document.body.style.width = "";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay phủ toàn bộ viewport */}
      <div
        className="fixed bg-black bg-opacity-60 backdrop-blur-sm"
        style={{
          zIndex: 99999,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          margin: 0,
          padding: 0,
        }}
      />

      {/* Modal container */}
      <div
        className="fixed flex items-center justify-center"
        style={{
          zIndex: 100000,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          margin: 0,
          padding: "16px",
        }}
      >
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Wand2 className="text-purple-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  AI Tạo Topics
                </h2>
                <p className="text-sm text-gray-600">
                  Tự động tạo các chủ đề cho chiến dịch marketing
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Campaign Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chọn chiến dịch *
              </label>
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">-- Chọn chiến dịch --</option>
                {campaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Topics Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số lượng topics
              </label>
              <select
                value={topicsCount}
                onChange={(e) => setTopicsCount(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value={5}>5 topics</option>
                <option value={10}>10 topics</option>
                <option value={15}>15 topics</option>
                <option value={20}>20 topics</option>
              </select>
            </div>

            {/* AI Settings */}
            <div className="space-y-4">
              <h3 className="text-md font-medium text-gray-900">Cài đặt AI</h3>

              {/* Creativity Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mức độ sáng tạo
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {creativityOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() =>
                        setAiSettings({
                          ...aiSettings,
                          creativity: option.value,
                        })
                      }
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        aiSettings.creativity === option.value
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-gray-600">
                        {option.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phong cách nội dung
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {styleOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() =>
                        setAiSettings({
                          ...aiSettings,
                          contentStyle: option.value,
                        })
                      }
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        aiSettings.contentStyle === option.value
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-gray-600">
                        {option.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Tự động tạo hashtags
                  </span>
                  <input
                    type="checkbox"
                    checked={aiSettings.includeHashtags}
                    onChange={(e) =>
                      setAiSettings({
                        ...aiSettings,
                        includeHashtags: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-purple-600"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Đề xuất hình ảnh
                  </span>
                  <input
                    type="checkbox"
                    checked={aiSettings.includeImages}
                    onChange={(e) =>
                      setAiSettings({
                        ...aiSettings,
                        includeImages: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-purple-600"
                  />
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Sparkles className="text-blue-600 mr-2" size={20} />
                <h4 className="font-medium text-blue-900">AI sẽ tạo gì?</h4>
              </div>
              <ul className="text-blue-700 mt-2 text-sm space-y-1">
                <li>• {topicsCount} chủ đề phù hợp với chiến dịch</li>
                <li>• Mô tả chi tiết cho từng topic</li>
                <li>• Đề xuất số lượng bài viết</li>
                <li>• Phân loại theo danh mục</li>
                {aiSettings.includeHashtags && (
                  <li>• Hashtags tối ưu cho mỗi topic</li>
                )}
                {aiSettings.includeImages && (
                  <li>• Đề xuất ý tưởng hình ảnh</li>
                )}
              </ul>
            </div>

            {generating && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600 mr-3"></div>
                  <h4 className="font-medium text-purple-900">
                    AI đang tạo topics...
                  </h4>
                </div>
                <p className="text-purple-700 mt-2 text-sm">
                  Đang phân tích chiến dịch và tạo các chủ đề phù hợp. Quá trình
                  này mất khoảng 30-60 giây.
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center p-6 border-t bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Hủy
            </button>
            <button
              onClick={handleGenerate}
              disabled={!selectedCampaign || generating}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                !selectedCampaign || generating
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              {generating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                  Đang tạo...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 inline" size={16} />
                  Tạo Topics
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AITopicGenerator;
