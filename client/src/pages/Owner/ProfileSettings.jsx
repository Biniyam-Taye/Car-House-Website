import React, { useEffect, useState } from "react";
import Title from "../../components/Owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";

const ProfileSettings = () => {
  const { user, axios, fetchUser, setUser } = useAppContext();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    businessName: "",
    location: "",
    bio: "",
  });
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        businessName: user.businessName || "",
        location: user.location || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateImage = async () => {
    if (!image) return;
    try {
      const formData = new FormData();
      formData.append("image", image);
      const { data } = await axios.post("/api/owner/update-image", formData);
      if (data.success) {
        toast.success(data.message);
        setImage(null);
        fetchUser();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await axios.post("/api/owner/update-profile", form);
      if (data.success) {
        toast.success(data.message);
        setUser(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 p-6 md:p-10">
      <Title
        title="Profile Settings"
        subTitle="Manage your public profile and listing information"
      />

      <div className="mt-8 max-w-2xl space-y-8">
        <div className="bg-white border border-borderColor rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Profile Photo</h3>
          <div className="flex items-center gap-6">
            <label htmlFor="profile-image" className="relative group cursor-pointer">
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : user?.image ||
                      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-100"
              />
              <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <img src={assets.edit_icon} alt="" className="w-6 invert" />
              </div>
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Upload a professional photo for your car listings
              </p>
              {image && (
                <button
                  onClick={updateImage}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm cursor-pointer"
                >
                  Save Photo
                </button>
              )}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-borderColor rounded-2xl p-6 space-y-4"
        >
          <h3 className="font-semibold text-gray-900 mb-2">Profile Information</h3>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Business Name</label>
            <input
              value={form.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Location</label>
            <input
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">About You</label>
            <textarea
              value={form.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-blue-500 resize-none"
              placeholder="Tell renters about your business and experience..."
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-medium cursor-pointer disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
