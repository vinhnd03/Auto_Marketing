import React, { useState } from "react";
import { X, Calendar, Send, CheckCircle } from "lucide-react";

const SocialMediaPublisher = ({
  isOpen,
  onClose,
  selectedContent,
  onPublishSuccess,
}) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSchedule, setPublishSchedule] = useState("immediate");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const handlePublish = async () => {
    setIsPublishing(true);

    // Simulate publishing process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock publish result
    const publishResult = {
      publishedContent: selectedContent.map((content) => ({
        ...content,
        status: "published",
        publishedAt: new Date().toISOString(),
        publishSchedule: publishSchedule,
        scheduledDate: publishSchedule === "scheduled" ? scheduledDate : null,
        scheduledTime: publishSchedule === "scheduled" ? scheduledTime : null,
      })),
      totalPublished: selectedContent.length,
      successfulPlatforms: selectedContent.reduce((acc, content) => {
        return acc + content.platforms.length;
      }, 0),
    };

    setIsPublishing(false);
    onPublishSuccess(publishResult);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4"
      style={{
        zIndex: 100002,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              <Send size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Publish Nội Dung
              </h3>
              <p className="text-sm text-gray-600">
                Đăng {selectedContent?.length || 0} nội dung lên mạng xã hội
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
          {/* Publish Schedule */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Lịch đăng bài:
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  value="immediate"
                  checked={publishSchedule === "immediate"}
                  onChange={(e) => setPublishSchedule(e.target.value)}
                  className="h-4 w-4 text-green-600"
                />
                <div className="flex items-center space-x-2">
                  <Send size={16} className="text-green-600" />
                  <span className="text-sm font-medium">Đăng ngay</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  value="scheduled"
                  checked={publishSchedule === "scheduled"}
                  onChange={(e) => setPublishSchedule(e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-blue-600" />
                  <span className="text-sm font-medium">Lên lịch</span>
                </div>
              </label>

              {publishSchedule === "scheduled" && (
                <div className="ml-7 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Ngày:
                    </label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Giờ:
                    </label>
                    <input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">
              Tổng quan nội dung:
            </h4>
            <div className="space-y-2">
              {selectedContent?.map((content, index) => (
                <div
                  key={content.id}
                  className="flex items-center justify-between bg-white p-3 rounded-lg border"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {content.type}
                      </div>
                      <div className="text-xs text-gray-500">
                        {content.platforms?.join(", ")}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Reach: {content.estimatedReach?.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publishing Progress */}
          {isPublishing && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                <h4 className="font-medium text-blue-900">
                  Đang publish nội dung...
                </h4>
              </div>
              <div className="text-sm text-blue-700">
                Vui lòng đợi trong giây lát...
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            disabled={isPublishing}
            className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
              isPublishing
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Hủy
          </button>
          <button
            onClick={handlePublish}
            disabled={
              isPublishing ||
              (publishSchedule === "scheduled" &&
                (!scheduledDate || !scheduledTime))
            }
            className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors flex items-center space-x-2 ${
              isPublishing ||
              (publishSchedule === "scheduled" &&
                (!scheduledDate || !scheduledTime))
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isPublishing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                <span>Đang publish...</span>
              </>
            ) : (
              <>
                <CheckCircle size={16} />
                <span>
                  {publishSchedule === "immediate"
                    ? "Publish Ngay"
                    : "Lên Lịch Publish"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaPublisher;
