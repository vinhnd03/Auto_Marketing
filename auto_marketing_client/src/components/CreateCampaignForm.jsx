import React, { useState } from "react";
import {
  UploadCloud,
  FileText,
  PlusCircle,
  Loader2,
  XCircle,
  Save,
  X,
  Type,
  Calendar,
  Flag,
  Edit3,
} from "lucide-react";
import * as XLSX from "xlsx";

export default function CreateCampaignForm({ onSubmit, onCancel }) {
  const [inputMode, setInputMode] = useState("manual");
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Sắp bắt đầu",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  const statuses = ["Sắp bắt đầu", "Đang hoạt động", "Đã kết thúc"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFileName(file.name);
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      if (json.length > 0) {
        const firstRow = json[0];
        setForm({
          name: firstRow.name || "",
          description: firstRow.description || "",
          startDate: firstRow.startDate || "",
          endDate: firstRow.endDate || "",
          status: firstRow.status || "Sắp bắt đầu",
        });
      }

      setIsLoading(false);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl mt-8 border border-gray-100">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-800">
        <PlusCircle className="w-6 h-6 text-blue-500" />
        Thêm chiến dịch mới
      </h2>

      {/* Input Mode Toggle */}
      <div className="flex gap-4 mb-8">
        {[
          {
            mode: "manual",
            label: "Nhập thủ công",
            icon: <FileText size={16} />,
          },
          {
            mode: "excel",
            label: "Nhập từ Excel",
            icon: <UploadCloud size={16} />,
          },
        ].map((btn) => (
          <button
            key={btn.mode}
            onClick={() => setInputMode(btn.mode)}
            type="button"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 ${
              inputMode === btn.mode
                ? "bg-blue-600 text-white shadow"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {btn.icon}
            {btn.label}
          </button>
        ))}
      </div>

      {/* Manual Input */}
      {inputMode === "manual" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
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
              placeholder="Nhập tên chiến dịch..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText size={16} className="text-blue-500" />
              Mô tả <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Nhập mô tả..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
            >
              <XCircle size={18} /> Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Save size={18} /> Lưu chiến dịch
            </button>
          </div>
        </form>
      )}

      {/* Excel Import */}
      {inputMode === "excel" && (
        <div className="border border-dashed border-blue-300 rounded-xl p-8 bg-blue-50 w-full text-center">
          <p className="text-sm text-gray-700 mb-5">
            Vui lòng chọn file Excel (.xlsx hoặc .xls) để nhập dữ liệu chiến
            dịch.
          </p>
          <label
            htmlFor="file-upload"
            className="inline-flex items-center gap-3 px-5 py-3 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:border-blue-500 hover:bg-blue-100 transition"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 text-blue-500" />
                <span>Đang xử lý...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-5 h-5 text-blue-500" />
                <span>Chọn file</span>
              </>
            )}
            <input
              id="file-upload"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileImport}
              className="hidden"
              disabled={isLoading}
            />
          </label>

          {selectedFileName && !isLoading && (
            <div className="mt-4 text-sm text-gray-700">
              <strong>Đã chọn:</strong> {selectedFileName}
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
              disabled={isLoading}
            >
              <XCircle size={18} /> Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
