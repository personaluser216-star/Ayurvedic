"use client";

import { useState } from "react";
import AdminHeader from "./componets/AdminHeader";
import AdminSidebar from "./componets/AdminSidebar";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <html lang="en">
      <body>
         <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
        <div className="flex h-screen bg-gray-100">

          <AdminSidebar sidebarOpen={sidebarOpen} />

          <div className="flex-1 flex flex-col">
            <AdminHeader
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />

            <main className="flex-1 p-6 overflow-auto">
              {children}
            </main>
          </div>

        </div>
      </body>
    </html>
  );
}
