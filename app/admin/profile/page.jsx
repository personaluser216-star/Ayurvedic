"use client";
import { useEffect, useState } from "react";
import { FaInstagram, FaTwitter, FaFacebook, FaTelegram } from "react-icons/fa";


export default function ProfileForm() {
  const [photo, setPhoto] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  

  // 👉 Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();

        if (data.success) {
          setProfile(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 👉 Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    if (photo) {
      formData.append("image", photo); // ⚠️ image (backend expects this)
    }

    const res = await fetch("/api/profile", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);

    if (data.success) {
      setProfile(data.data); // update UI after submit
    }
  };

  if (loading) return <p>Loading profile...</p>;

<<<<<<< HEAD
return (
  <div className="border p-6 rounded-md border-gray-300 bg-white">
    <p className="font-bold text-xl mb-4">Profile</p>

    {profile && (
      <>
        {/* ================= TOP CARD ================= */}
        <div className="border border-gray-300 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left: Image + Basic Info */}
          <div className="flex items-center gap-4">
            <img
              src={profile.image?.url}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
            />

            <div>
              <p className="text-lg font-semibold capitalize">
                {profile.personalInfo.firstName} {profile.personalInfo.lastName}
              </p>
              <p className="text-sm text-gray-500 capitalize">
                {profile.personalInfo.city}, {profile.personalInfo.country}
              </p>
              <p className="text-sm text-gray-400">
                {profile.personalInfo.bio}
              </p>
            </div>
          </div>

          {/* Right: Social Icons */}
          <div className="flex gap-2">
            {profile.socialLinks.facebook && (
              <a
                href={profile.socialLinks.facebook}
                target="_blank"
                className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
              >
                <FaFacebook />
              </a>
            )}

            {profile.socialLinks.instagram && (
              <a
                href={profile.socialLinks.instagram}
                target="_blank"
                className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition"
              >
                <FaInstagram />
              </a>
            )}

            {profile.socialLinks.telegram && (
              <a
                href={profile.socialLinks.telegram}
                target="_blank"
                className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition"
              >
                <FaTelegram />
              </a>
            )}

            {profile.socialLinks.twitter && (
              <a
                href={profile.socialLinks.twitter}
                target="_blank"
                className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-sky-500 hover:text-white transition"
              >
                <FaTwitter />
              </a>
            )}
          </div>
        </div>

        {/* ================= PERSONAL INFO ================= */}
        <div className="bg-white border border-gray-300 mt-6 rounded-lg p-6">
          <p className="font-semibold uppercase mb-4">
            Personal Information
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-md">
            <div>
              <p className="text-gray-500">First Name</p>
              <p className="font-medium capitalize">
                {profile.personalInfo.firstName}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Last Name</p>
              <p className="font-medium capitalize">
                {profile.personalInfo.lastName}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">
                {profile.personalInfo.email}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium">
                {profile.personalInfo.phone}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-gray-500">Bio</p>
              <p className="font-medium">
                {profile.personalInfo.bio}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 mt-6 rounded-lg p-6">
 <p className="font-semibold uppercase mb-4">
            Address
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-md">
            <div>
              <p className="text-gray-500">City/State</p>
              <p className="font-medium capitalize">
                {profile.personalInfo.city}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Country</p>
              <p className="font-medium capitalize">
                {profile.personalInfo.country}
              </p>
            </div>
            </div>
        </div>
      </>
    )}
  </div>
);
=======
  return (
   <div className="border p-6 rounded-md border-gray-300 bg-white">
    <div className=" bg-white">

      {profile && (
  <div className="border border-gray-300 rounded p-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-4">

    {/* 🔹 Left Side (Image + Name) */}
    <div className="flex items-center gap-4">
      <img
        src={profile.image?.url}
        alt="profile"
        className="w-20 h-20 rounded-full object-cover"
      />

      <div>
        <p className="text-lg font-semibold">
          {profile.personalInfo.firstName} {profile.personalInfo.lastName}
        </p>
        <p className="text-sm text-gray-500">
          {profile.personalInfo.city}, {profile.personalInfo.country}
        </p>
      </div>
    </div>

   <div className="flex gap-3 text-xl mt-4">
 <div className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center">
  {profile.socialLinks.facebook && (
    <a
      href={profile.socialLinks.facebook}
      target="_blank"
      className=" text-xl hover:scale-110 transition"
    >
      <FaFacebook />
    </a>
  )}
</div>
<div className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center">
  {profile.socialLinks.instagram && (
    <a
      href={profile.socialLinks.instagram}
      target="_blank"
      className=" text-xl hover:scale-110 transition"
    >
      <FaInstagram />
    </a>
  )}
</div>

  <div className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center">
  {profile.socialLinks.telegram && (
    <a
      href={profile.socialLinks.telegram}
      target="_blank"
      className="text-xl hover:scale-110 transition"
    >
      <FaTelegram />
    </a>
  )}
</div>

<div className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center">
  {profile.socialLinks.twitter && (
    <a
      href={profile.socialLinks.twitter}
      target="_blank"
      className="text-xl hover:scale-110 transition"
    >
      <FaTwitter />
    </a>
  )}
</div>


 
</div>


  </div>
)}


      
    </div>
    <div className="bg-white border border-gray-300 mt-6 rounded-md p-6">
      <p className="font-semibold uppercase ">Personal information</p>
      <div className="pt-4">
        <p className="font-light">FirstName</p>
      </div>
        <div>
          <p>LastName</p>
        </div>
    </div>
   </div>
  );
>>>>>>> f4947cc6c0ca899ce862d30ab4ee428e526bbd66
}
