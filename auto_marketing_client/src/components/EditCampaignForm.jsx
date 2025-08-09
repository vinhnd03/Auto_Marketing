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
      <div className="border-b pb-3 mb-4">
        <h2 className="flex items-center text-lg font-semibold text-gray-800">
          <Edit3 size={20} className="mr-2 text-blue-500" />
          Chỉnh sửa chiến dịch
        </h2>
        <p className="text-sm text-gray-500">
          Cập nhật thông tin chiến dịch và lưu thay đổi.
        </p>
      </div>

      {/* Tên chiến dịch */}
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
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
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-100"
        />
      </div>

      {/* Mô tả */}
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <FileText size={16} className="mr-2 text-blue-500" />
          Mô tả
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Nhập mô tả ngắn gọn..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-100"
          rows={3}
        />
      </div>

      {/* Ngày bắt đầu & Ngày kết thúc */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Calendar size={16} className="mr-2 text-blue-500" />
            Ngày bắt đầu
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-100"
          />
        </div>
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Calendar size={16} className="mr-2 text-blue-500" />
            Ngày kết thúc
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Trạng thái */}
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <Flag size={16} className="mr-2 text-blue-500" />
          Trạng thái
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-100"
        >
          <option value="Sắp bắt đầu">Sắp bắt đầu</option>
          <option value="Đang hoạt động">Đang hoạt động</option>
          <option value="Đã kết thúc">Đã kết thúc</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <X size={16} />
          Hủy
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
        >
          <Save size={16} />
          Cập nhật
        </button>
      </div>
    </form>
  );
}
