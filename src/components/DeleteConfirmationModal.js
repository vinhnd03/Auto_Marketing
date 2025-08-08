
export default function DeleteConfirmationModal({
  isOpen,
  onCancel,
  onConfirm,
  campaignName,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Xác nhận xóa
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Bạn có chắc chắn muốn xóa chiến dịch{" "}
          <span className="font-medium text-red-600">"{campaignName}"</span>?
          Hành động này không thể hoàn tác.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
