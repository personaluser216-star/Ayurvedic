"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

export default function AdminHeader({ sidebarOpen, setSidebarOpen }) {

const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (data.success) setProfile(data.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);
 
  return (
    <header className="h-16 bg-white border-b border-gray-300 px-4 flex items-center justify-between">
      
      {/* Left: Menu + Search */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2  border border-gray-200 hover:bg-gray-100"
        >
          <CgMenuLeftAlt size={22} className="text-gray-500" />
        </button>

       
      </div>

      {/* Right: Admin profile */}
      <div className="flex items-center gap-4">
      <button 
        onClick={() => router.push("/admin/profile")}
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
      >
        {profile?.image?.url ? (
          <img
            src={profile.image.url}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <FaRegUserCircle size={22} className="text-gray-600" />
        )}

        <span className="hidden sm:block text-gray-700 font-medium">
          {profile
            ? `${profile.personalInfo.firstName} ${profile.personalInfo.lastName}`
            : "Admin"}
        </span>
      </button>
    </div>
    </header>
  );
}
