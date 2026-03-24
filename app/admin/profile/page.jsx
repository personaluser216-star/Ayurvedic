"use client";
import { useEffect, useState } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaTelegram,
  FaEdit,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function ProfileForm() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [editType, setEditType] = useState(null);
  const [formData, setFormData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // ✅ Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.success) setProfile(data.data);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  // ✅ Open Edit
  const openEdit = (type) => {
    if (!profile) return;

    setEditType(type);
    setIsOpen(true);

    setFormData({
  firstName: profile.personalInfo.firstName || "",
  lastName: profile.personalInfo.lastName || "",
  email: profile.personalInfo.email || "",
  phone: profile.personalInfo.phone || "",
  bio: profile.personalInfo.bio || "",
  city: profile.personalInfo.city || "",
  country: profile.personalInfo.country || "",
  facebook: profile.socialLinks.facebook || "",
  instagram: profile.socialLinks.instagram || "",
  telegram: profile.socialLinks.telegram || "",
  twitter: profile.socialLinks.twitter || "",
  
});

setPreviewImage(profile.image?.url || null);
setImageFile(null);

    // Set profile image preview
    setPreviewImage(profile.image?.url || null);
    setImageFile(null);
  };

  // ✅ Handle image change
  const handleImageChange = (file) => {
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

const handleUpdate = async () => {
  let res;

  if (imageFile) {
    // Send FormData
    const formPayload = new FormData();

    // Add personal info + social links
    Object.entries(formData).forEach(([key, val]) => {
      formPayload.append(key, val);
    });

    // Add image
    formPayload.append("image", imageFile);

    res = await fetch("/api/profile", {
      method: "PUT",
      body: formPayload, // browser handles content-type
    });
  } else {
    // Send JSON if no image
    res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          bio: formData.bio,
          city: formData.city,
          country: formData.country,
        },
        socialLinks: {
          facebook: formData.facebook,
          instagram: formData.instagram,
          telegram: formData.telegram,
          twitter: formData.twitter,
        },
      }),
    });
  }

  const data = await res.json();
  if (data.success) {
    setProfile(data.data);
    setIsOpen(false);
    toast.success("Profile updated successfully!");
  } else {
    toast.error(data.message || "Failed to update profile");
  }
};

  if (loading) return <p>Loading...</p>;

  return (
    <div className="border p-6 -md border-gray-300 bg-white">
      <p className="font-bold text-xl mb-4">Profile</p>

      {profile && (
        <>
          {/* ================= TOP ================= */}
          <div className="border bg-gray-100 border-gray-300 -lg p-4 flex justify-between items-start">
            <div className="flex gap-4 items-center">
              <img
                src={profile.image?.url}
                className="w-20 h-20 -full rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-lg capitalize">
                  {profile.personalInfo.firstName} {profile.personalInfo.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {profile.personalInfo.city}, {profile.personalInfo.country}
                </p>
                <p className="text-sm text-gray-400">{profile.personalInfo.bio}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex gap-2 text-xl">
                {profile.socialLinks.facebook && <FaFacebook />}
                {profile.socialLinks.instagram && <FaInstagram />}
                {profile.socialLinks.telegram && <FaTelegram />}
                {profile.socialLinks.twitter && <FaTwitter />}
              </div>

              <button
                onClick={() => openEdit("top")}
                className="w-10 h-10 bg-gray-100 -full flex items-center justify-center"
              >
                <FaEdit className="text-blue-500 text-xl"/>
              </button>
            </div>
          </div>

          {/* ================= PERSONAL ================= */}
          <div className="border border-gray-300 mt-6 -lg p-4 bg-gray-100">
            <div className="flex justify-between mb-2">
              <p className="font-semibold uppercase">Personal Information</p>
              <button
                onClick={() => openEdit("personal")}
                className="w-10 h-10 bg-gray-100 -full flex items-center justify-center"
              >
                <FaEdit className="text-blue-500 text-xl" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">First Name</p>
                <p>{profile.personalInfo.firstName}</p>
              </div>
              <div>
                <p className="text-gray-500">Last Name</p>
                <p>{profile.personalInfo.lastName}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p>{profile.personalInfo.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p>{profile.personalInfo.phone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-500">Bio</p>
                <p>{profile.personalInfo.bio}</p>
              </div>
            </div>
          </div>

          {/* ================= ADDRESS ================= */}
          <div className="border border-gray-300 mt-6 -lg p-4 bg-gray-100">
            <div className="flex justify-between mb-2">
              <p className="font-semibold uppercase">Address</p>
              <button
                onClick={() => openEdit("address")}
                className="w-10 h-10 bg-gray-100 -full flex items-center justify-center"
              >
                <FaEdit className="text-blue-500 text-xl" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">City / State</p>
                <p>{profile.personalInfo.city}</p>
              </div>
              <div>
                <p className="text-gray-500">Country</p>
                <p>{profile.personalInfo.country}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ================= MODAL ================= */}
     {isOpen && profile && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
    <div className="bg-white p-4 -lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

      <div className="flex flex-col gap-6 pb-4 mb-4">
        {/* Image upload */}
        <div>
          {previewImage && (
            <img
              src={previewImage}
              className="w-16 h-16 -full object-cover mb-2"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files[0])}
          />
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="First Name"
            value={formData.firstName}
            onChange={(val) => setFormData({ ...formData, firstName: val })}
          />
          <Field
            label="Last Name"
            value={formData.lastName}
            onChange={(val) => setFormData({ ...formData, lastName: val })}
          />
          <Field
            label="Email"
            value={formData.email}
            onChange={(val) => setFormData({ ...formData, email: val })}
          />
          <Field
            label="Phone"
            value={formData.phone}
            onChange={(val) => setFormData({ ...formData, phone: val })}
          />
          <Field
            label="City"
            value={formData.city}
            onChange={(val) => setFormData({ ...formData, city: val })}
          />
          <Field
            label="Country"
            value={formData.country}
            onChange={(val) => setFormData({ ...formData, country: val })}
          />
          <Field
            label="Facebook"
            value={formData.facebook}
            onChange={(val) => setFormData({ ...formData, facebook: val })}
          />
          <Field
            label="Instagram"
            value={formData.instagram}
            onChange={(val) => setFormData({ ...formData, instagram: val })}
          />
          <Field
            label="Telegram"
            value={formData.telegram}
            onChange={(val) => setFormData({ ...formData, telegram: val })}
          />
          <Field
            label="Twitter"
            value={formData.twitter}
            onChange={(val) => setFormData({ ...formData, twitter: val })}
          />
          <div className="md:col-span-2">
            <p className="text-gray-500 text-sm">Bio</p>
            <textarea
              value={formData.bio || ""}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full border p-2 "
            />
          </div>
        </div>
      </div>

      <div className="flex justify-start gap-2">
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 border "
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-black text-white "
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

// ✅ Small reusable Field component
function Field({ label, value, onChange }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border p-2 "
      />
    </div>
  );
}