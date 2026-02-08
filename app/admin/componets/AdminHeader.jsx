"use client";

import { useRouter } from "next/navigation";
import { CgMenuLeftAlt } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

export default function AdminHeader({ sidebarOpen, setSidebarOpen }) {

  const router = useRouter();
  return (
    <header className="h-16 bg-white border-b border-gray-300 px-4 flex items-center justify-between">
      
      {/* Left: Menu + Search */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded border border-gray-200 hover:bg-gray-100"
        >
          <CgMenuLeftAlt size={22} className="text-gray-500" />
        </button>

        {/* Search bar */}
        <div className="relative hidden md:block">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-96 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-100"
          />
        </div>
      </div>

      {/* Right: Admin profile */}
      <div className="flex items-center gap-4">
        <button 
        onClick={()=>router.push("/admin/profile")}
        className="flex items-center gap-1 p-2 rounded ">
          <FaRegUserCircle size={22} className="text-gray-600" />
          <span className="hidden sm:block text-gray-700 font-medium">
            Admin
          </span>
        </button>
      </div>
    </header>
  );
}
