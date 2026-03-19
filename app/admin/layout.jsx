"use client";

import { useEffect, useState } from "react";
import AdminHeader from "./componets/AdminHeader";
import AdminSidebar from "./componets/AdminSidebar";
import "./globals.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Step 1: start socket server
    fetch("/api/socket");

    // Step 2: connect socket
    const socket = io({
      path: "/api/socket",
    });

    socket.on("connect", () => {
      console.log("✅ Connected to socket");
    });

    // 🔥 IMPORTANT: listen new order
    socket.on("new_order", (order) => {
      console.log("🔥 New Order:", order);

    toast.success(
  <strong>🛒 New Order Arrived!</strong>,
  {
    position: "top-center",
    autoClose: false,          // won't close automatically
    closeOnClick: true,        // click to close
    closeButton: true,         // show X button
    draggable: true,
    pauseOnHover: true,
    style: {
      minWidth: "300px",
      textAlign: "center",
      border: "1px solid #ccc",
      backgroundColor: "black",
      color: "white",           // text white
      padding: "15px 20px",
      borderRadius: "8px",
    },
  }
);
       
    });

    return () => socket.disconnect();
  }, []);

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
