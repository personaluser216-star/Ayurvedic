"use client";

import PageBanner from "@/componets/pagebanner";
import React from "react";

const EnquiryPage = () => {
  return (
    <div>
      <PageBanner title="Enquiry" />

      {/* ===== ENQUIRY FORM ===== */}
      <div className="max-w-5xl md:mx-auto px-6 py-12">
        <div className="bg-white   md:p-8">
          <h2 className="text-2xl font-semibold mb-6 text-left">
            Send Your Enquiry
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-2 "
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-2 "
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                required
                placeholder="Enter your phone number"
                className="w-full border rounded-lg px-4 py-2 "
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                required
                placeholder="Enter your address"
                className="w-full border rounded-lg px-4 py-2 "
              />
            </div>

            {/* Subject */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                required
                placeholder="Enter subject"
                className="w-full border rounded-lg px-4 py-2 "
              />
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Your Message
              </label>
              <textarea
                rows="4"
                required
                placeholder="Write your message..."
                className="w-full border rounded-lg px-4 py-2 "
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-left">
              <button
                type="submit"
                className="logo-text text-white px-8 py-3 shadow hover:bg-green-700 transition"
              >
                Submit Enquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryPage;
