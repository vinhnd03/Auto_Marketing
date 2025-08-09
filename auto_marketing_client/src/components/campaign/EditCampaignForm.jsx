import React, { useState } from "react";
import { Save, X, Type, FileText, Calendar, Flag, Edit3 } from "lucide-react";

export default function EditCampaignForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="pb-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Edit3 size={20} className="text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">
            Chỉnh sửa chiến dịch
          </h2>
        </div>
        <p className="text-sm text-gray-600">
          Cập nhật thông tin chiến dịch và lưu thay đổi.
        </p>
      </div>

      {/* Tên chiến dịch */}
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
          <Type size={16} className="mr-2 text-blue-500" />
          Tên chiến dịch <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Nhập tên chiến dịch..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {/* Mô tả */}
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
          <FileText size={16} className="mr-2 text-blue-500" />
          Mô tả
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Nhập mô tả ngắn gọn..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          rows={4}
        />
      </div>

      {/* Ngày bắt đầu & Ngày kết thúc */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Calendar size={16} className="mr-2 text-blue-500" />
            Ngày bắt đầu
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Calendar size={16} className="mr-2 text-blue-500" />
            Ngày kết thúc
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Trạng thái */}
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
          <Flag size={16} className="mr-2 text-blue-500" />
          Trạng thái
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
        >
          <option value="Sắp bắt đầu">Sắp bắt đầu</option>
          <option value="Đang hoạt động">Đang hoạt động</option>
          <option value="Đã kết thúc">Đã kết thúc</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-6 mt-8">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          <X size={16} />
          Hủy
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          <Save size={16} />
          Cập nhật
        </button>
      </div>
    </form>
  );
}
