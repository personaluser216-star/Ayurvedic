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
}
