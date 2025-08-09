import React, { useState, useEffect } from "react";
import {
  Pencil,
  Trash2,
  FilePlus,
  Search,
  SortAsc,
  SortDesc,
  Eye,
} from "lucide-react";
import CreateCampaignForm from "./CreateCampaignForm";
import { DeleteConfirmationModal } from "../ui";
import EditCampaignForm from "./EditCampaignForm";

const CampaignTable = ({ campaigns = [], onUpdateCampaigns }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("startDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [campaignToEdit, setCampaignToEdit] = useState(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showEditModal) {
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
  }, [showEditModal]);

  // Enhanced filter and sort function
  const processedCampaigns = campaigns
    .filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const order = sortOrder === "asc" ? 1 : -1;

      if (sortField === "startDate" || sortField === "endDate") {
        return (new Date(aValue) - new Date(bValue)) * order;
      }
      return aValue.localeCompare(bValue) * order;
    });

  // Pagination
  const totalPages = Math.ceil(processedCampaigns.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentCampaigns = processedCampaigns.slice(startIndex, endIndex);

  // Event handlers
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleCreateCampaign = (newCampaign) => {
    onUpdateCampaigns([...campaigns, { ...newCampaign, id: Date.now() }]);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    onUpdateCampaigns(campaigns.filter((campaign) => campaign.id !== id));
    setShowDeleteModal(false);
    setCampaignToDelete(null);
  };

  const handleUpdateCampaign = (updatedCampaign) => {
    onUpdateCampaigns(
      campaigns.map((campaign) =>
        campaign.id === updatedCampaign.id ? updatedCampaign : campaign
      )
    );
    setShowEditModal(false);
    setCampaignToEdit(null);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      "Sắp bắt đầu": { bg: "bg-yellow-100", text: "text-yellow-800" },
      "Đang hoạt động": { bg: "bg-green-100", text: "text-green-800" },
      "Đã kết thúc": { bg: "bg-gray-100", text: "text-gray-800" },
    };
    const config = statusConfig[status] || statusConfig["Sắp bắt đầu"];
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Show Create Campaign Form */}
      {showForm ? (
        <CreateCampaignForm
          onSubmit={handleCreateCampaign}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Chiến dịch trong workspace
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Quản lý và theo dõi tất cả chiến dịch marketing
              </p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setShowForm(true)}
            >
              <FilePlus size={18} />
              <span className="text-sm font-medium">Tạo chiến dịch mới</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center bg-white border rounded-lg shadow-sm w-full">
                <span className="px-3 text-gray-500">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Tìm kiếm chiến dịch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-2 w-full sm:w-72 border-none rounded-lg focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 whitespace-nowrap">
                Hiển thị:
              </span>
              <select
                value={recordsPerPage}
                onChange={(e) => {
                  setRecordsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5 bản ghi</option>
                <option value={10}>10 bản ghi</option>
                <option value={20}>20 bản ghi</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <button
                        className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                        onClick={() => handleSort("name")}
                      >
                        Tên chiến dịch
                        {sortField === "name" &&
                          (sortOrder === "asc" ? (
                            <SortAsc size={14} />
                          ) : (
                            <SortDesc size={14} />
                          ))}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mô tả
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button
                        className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                        onClick={() => handleSort("startDate")}
                      >
                        Ngày bắt đầu
                        {sortField === "startDate" &&
                          (sortOrder === "asc" ? (
                            <SortAsc size={14} />
                          ) : (
                            <SortDesc size={14} />
                          ))}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button
                        className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                        onClick={() => handleSort("endDate")}
                      >
                        Ngày kết thúc
                        {sortField === "endDate" &&
                          (sortOrder === "asc" ? (
                            <SortAsc size={14} />
                          ) : (
                            <SortDesc size={14} />
                          ))}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button
                        className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                        onClick={() => handleSort("status")}
                      >
                        Trạng thái
                        {sortField === "status" &&
                          (sortOrder === "asc" ? (
                            <SortAsc size={14} />
                          ) : (
                            <SortDesc size={14} />
                          ))}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCampaigns.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <FilePlus size={48} className="mb-2 text-gray-300" />
                          <p className="text-lg font-medium">
                            Chưa có chiến dịch nào
                          </p>
                          <p className="text-sm mt-1">
                            Tạo chiến dịch đầu tiên để bắt đầu
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {campaign.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 max-w-xs truncate">
                            {campaign.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(campaign.startDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(campaign.endDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(campaign.status)}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                              title="Xem chi tiết"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              className="text-green-600 hover:text-green-800 transition-colors"
                              title="Chỉnh sửa"
                              onClick={() => {
                                setCampaignToEdit(campaign);
                                setShowEditModal(true);
                              }}
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 transition-colors"
                              title="Xóa"
                              onClick={() => {
                                setCampaignToDelete(campaign);
                                setShowDeleteModal(true);
                              }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {processedCampaigns.length > 0 && (
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Hiển thị{" "}
                    <span className="font-medium">{startIndex + 1}</span> đến{" "}
                    <span className="font-medium">
                      {Math.min(endIndex, processedCampaigns.length)}
                    </span>{" "}
                    trong tổng số{" "}
                    <span className="font-medium">
                      {processedCampaigns.length}
                    </span>{" "}
                    kết quả
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md text-sm border ${
                        currentPage === 1
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      «
                    </button>
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md text-sm border ${
                        currentPage === 1
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      ‹
                    </button>
                    <span className="px-3 py-1 text-sm text-gray-700">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md text-sm border ${
                        currentPage === totalPages
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      ›
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md text-sm border ${
                        currentPage === totalPages
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      »
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Edit Campaign Modal */}
      {showEditModal && campaignToEdit && (
        <>
          <div
            className="modal-backdrop"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(4px)",
              zIndex: 99999,
              margin: 0,
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setShowEditModal(false)}
          >
            <div
              className="modal-content"
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                width: "100%",
                maxWidth: "672px",
                maxHeight: "90vh",
                overflowY: "auto",
                margin: "16px",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ padding: "24px" }}>
                <EditCampaignForm
                  initialData={campaignToEdit}
                  onSubmit={handleUpdateCampaign}
                  onCancel={() => setShowEditModal(false)}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        campaignName={campaignToDelete?.name}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => handleDelete(campaignToDelete.id)}
      />
    </div>
  );
};

export default CampaignTable;
