import React, { useState } from "react";
import {
  FileText,
  Type,
  Calendar,
  Flag,
  Target,
  Users,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Save,
  Upload,
} from "lucide-react";

export default function CreateCampaignForm({ onSubmit, onCancel }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [dataSourceMethod, setDataSourceMethod] = useState(null); // null, 'manual', 'upload', 'ai'
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Sắp bắt đầu",
    campaignContent: "", // For manual input or AI generation
  });

  const statuses = ["Sắp bắt đầu", "Đang hoạt động", "Đã kết thúc"];

  const steps = [
    {
      id: 1,
      title: "Thông tin cơ bản",
      icon: <Target className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "Nguồn dữ liệu",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Cài đặt chiến dịch",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 4,
      title: "Xác nhận",
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Tạo chiến dịch Marketing mới
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Tạo chiến dịch marketing với AI để tự động sinh topics và nội dung
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 px-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                currentStep >= step.id
                  ? currentStep === step.id
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-green-500 border-green-500 text-white"
                  : "bg-gray-100 border-gray-300 text-gray-400"
              }`}
            >
              {currentStep > step.id ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                step.icon
              )}
            </div>

            {/* Step Label */}
            <div className="ml-3 flex flex-col">
              <span
                className={`text-sm font-medium ${
                  currentStep >= step.id ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {step.title}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                  currentStep > step.id ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="space-y-6">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <>
            <div className="text-center py-8">
              <Target className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Thông tin cơ bản
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Nhập thông tin cơ bản cho chiến dịch marketing của bạn
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto space-y-6"
            >
              {/* Campaign Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Type size={16} className="text-blue-500" />
                  Tên chiến dịch <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="VD: Summer Sale 2024"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Campaign Description */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FileText size={16} className="text-blue-500" />
                  Mô tả chiến dịch <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  placeholder="Mô tả mục tiêu và nội dung chính của chiến dịch..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                />
              </div>
            </form>
          </>
        )}

        {/* Step 2: Data Source */}
        {currentStep === 2 && (
          <>
            {/* If no method selected, show options */}
            {!dataSourceMethod && (
              <>
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Nguồn dữ liệu
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Chọn cách thức nhập dữ liệu cho chiến dịch
                  </p>
                </div>

                <div className="max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Manual Input Option */}
                    <button
                      onClick={() => setDataSourceMethod("manual")}
                      className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50 hover:border-blue-300 transition-colors text-left"
                    >
                      <div className="text-center">
                        <FileText className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Nhập thủ công
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Nhập thông tin trực tiếp vào form
                        </p>
                      </div>
                    </button>

                    {/* Upload File Option */}
                    <button
                      onClick={() => setDataSourceMethod("upload")}
                      className="border-2 border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors text-left"
                    >
                      <div className="text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Upload file
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Upload file phần tích thị trường hoặc brief
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Manual Input Form */}
            {dataSourceMethod === "manual" && (
              <>
                <div className="text-center py-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Nguồn dữ liệu cho chiến dịch
                  </h3>
                </div>

                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Data Source Selection - Only show selected method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Chọn nguồn dữ liệu
                    </label>
                    <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <div>
                          <h4 className="font-medium text-gray-800">
                            Nhập thủ công
                          </h4>
                          <p className="text-sm text-gray-600">
                            Nhập nội dung và ý tưởng cho chiến dịch
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Campaign Content Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nội dung chiến dịch{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="campaignContent"
                      value={form.campaignContent}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Nhập ý tưởng, nội dung, thông tin sản phẩm/dịch vụ, đối tượng mục tiêu..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      AI sẽ sử dụng thông tin này để tạo ra các topics và nội
                      dung cho chiến dịch
                    </p>
                  </div>

                  {/* Back to selection */}
                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={() => setDataSourceMethod(null)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      ← Chọn phương thức khác
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Upload File Form */}
            {dataSourceMethod === "upload" && (
              <>
                <div className="text-center py-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Nguồn dữ liệu cho chiến dịch
                  </h3>
                </div>

                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Data Source Selection - Only show selected method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Chọn nguồn dữ liệu
                    </label>
                    <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                      <div className="flex items-center gap-3">
                        <Upload className="w-5 h-5 text-green-500" />
                        <div>
                          <h4 className="font-medium text-gray-800">
                            Upload file
                          </h4>
                          <p className="text-sm text-gray-600">
                            Upload file phần tích thị trường hoặc brief
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* File Upload Area */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload file
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-700 mb-2">
                        Kéo thả file vào đây
                      </h4>
                      <p className="text-gray-500 mb-4">hoặc</p>
                      <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                        <span>Chọn file</span>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx,.txt"
                        />
                      </label>
                      <p className="text-sm text-gray-500 mt-3">
                        Hỗ trợ: PDF, DOC, DOCX, TXT (Tối đa 10MB)
                      </p>
                    </div>
                  </div>

                  {/* Campaign Content Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nội dung chiến dịch{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="campaignContent"
                      value={form.campaignContent}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Nhập ý tưởng, nội dung, thông tin sản phẩm/dịch vụ, đối tượng mục tiêu..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      AI sẽ sử dụng thông tin này để tạo ra các topics và nội
                      dung cho chiến dịch
                    </p>
                  </div>

                  {/* Back to selection */}
                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={() => setDataSourceMethod(null)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      ← Chọn phương thức khác
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Step 3: Campaign Settings */}
        {currentStep === 3 && (
          <>
            <div className="text-center py-8">
              <Users className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Cài đặt chiến dịch
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Thiết lập thời gian và trạng thái chiến dịch
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto space-y-6"
            >
              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Calendar size={16} className="text-blue-500" />
                    Ngày bắt đầu <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Calendar size={16} className="text-blue-500" />
                    Ngày kết thúc <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="endDate"
                    type="date"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Flag size={16} className="text-blue-500" />
                  Trạng thái
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <>
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Xác nhận thông tin
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Kiểm tra lại thông tin trước khi tạo chiến dịch
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Tên chiến dịch:
                  </span>
                  <p className="text-gray-800 font-semibold">
                    {form.name || "Chưa nhập"}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Mô tả:
                  </span>
                  <p className="text-gray-800">
                    {form.description || "Chưa nhập"}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Nguồn dữ liệu:
                  </span>
                  <p className="text-gray-800 font-semibold">
                    {dataSourceMethod === "manual"
                      ? "Nhập thủ công"
                      : dataSourceMethod === "upload"
                      ? "Upload file"
                      : "Chưa chọn"}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Nội dung chiến dịch:
                  </span>
                  <p className="text-gray-800">
                    {form.campaignContent || "Chưa nhập"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Ngày bắt đầu:
                    </span>
                    <p className="text-gray-800 font-semibold">
                      {form.startDate || "Chưa chọn"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Ngày kết thúc:
                    </span>
                    <p className="text-gray-800 font-semibold">
                      {form.endDate || "Chưa chọn"}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Trạng thái:
                  </span>
                  <p className="text-gray-800 font-semibold">{form.status}</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <button
            type="button"
            onClick={currentStep === 1 ? onCancel : handlePrev}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={18} />
            {currentStep === 1 ? "Hủy" : "Quay lại"}
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={
                (currentStep === 1 && (!form.name || !form.description)) ||
                (currentStep === 2 &&
                  (!dataSourceMethod || !form.campaignContent)) ||
                (currentStep === 3 && (!form.startDate || !form.endDate))
              }
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Tiếp tục
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                !form.name ||
                !form.description ||
                !form.campaignContent ||
                !form.startDate ||
                !form.endDate
              }
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Save size={18} />
              Lưu chiến dịch
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
