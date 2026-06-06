import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageOwners = () => {
  const { axios } = useAppContext();
  const [owners, setOwners] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const fetchOwners = async () => {
    try {
      const endpoint =
        filter === "pending" ? "/api/admin/pending-owners" : "/api/admin/owners";
      const { data } = await axios.get(endpoint);
      if (data.success) {
        setOwners(filter === "pending" ? data.pendingOwners : data.owners);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, [filter]);

  const handleReview = async (ownerId, action) => {
    try {
      const payload = { ownerId, action };
      if (action === "reject") {
        payload.rejectionReason = rejectionReason;
      }
      const { data } = await axios.post("/api/admin/review-owner", payload);
      if (data.success) {
        toast.success(data.message);
        setRejectingId(null);
        setRejectionReason("");
        fetchOwners();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusBadge = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-700",
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">List Cars Applications</h2>
          <p className="text-sm text-gray-500 mt-1">
            Approve or reject car lister accounts based on their profile
          </p>
        </div>
        <div className="flex gap-2">
          {["pending", "all"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize cursor-pointer transition-colors ${
                filter === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {tab === "all" ? "All Owners" : "Pending"}
            </button>
          ))}
        </div>
      </div>

      {owners.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500">
          No {filter === "pending" ? "pending" : ""} applications found.
        </div>
      ) : (
        <div className="grid gap-4">
          {owners.map((owner) => (
            <div
              key={owner._id}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-semibold text-gray-900">{owner.name}</h3>
                    {statusBadge(owner.approvalStatus)}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <p><span className="text-gray-500">Email:</span> {owner.email}</p>
                    <p><span className="text-gray-500">Phone:</span> {owner.phone || "—"}</p>
                    <p><span className="text-gray-500">Business:</span> {owner.businessName || "—"}</p>
                    <p><span className="text-gray-500">Location:</span> {owner.location || "—"}</p>
                  </div>
                  {owner.bio && (
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                      <span className="font-medium text-gray-700">About: </span>
                      {owner.bio}
                    </p>
                  )}
                  {owner.rejectionReason && owner.approvalStatus === "rejected" && (
                    <p className="text-sm text-red-600">
                      Rejection reason: {owner.rejectionReason}
                    </p>
                  )}
                  <p className="text-xs text-gray-400">
                    Applied: {new Date(owner.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {owner.approvalStatus === "pending" && (
                  <div className="flex flex-col gap-2 min-w-[180px]">
                    <button
                      onClick={() => handleReview(owner._id, "approve")}
                      className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-medium cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setRejectingId(owner._id)}
                      className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-sm font-medium cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>

              {rejectingId === owner._id && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Reason for rejection (optional)"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-red-400"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReview(owner._id, "reject")}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm cursor-pointer"
                    >
                      Confirm Reject
                    </button>
                    <button
                      onClick={() => {
                        setRejectingId(null);
                        setRejectionReason("");
                      }}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOwners;
