"use client";

import PageBanner from "@/componets/pagebanner";
import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div>
      <PageBanner title="Contact Us" />

      {/* ===== CONTACT SECTION ===== */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* ===== LEFT : MAP ===== */}
        <div className="w-full h-[450px] rounded-xl overflow-hidden shadow">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=Ahmedabad,India&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>

        {/* ===== RIGHT : INFO CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Address */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-3">
            <FaMapMarkerAlt className="text-green-600 text-2xl" />
            <h3 className="font-semibold text-lg">Address</h3>
            <p className="text-sm text-gray-600">
              Kanhiya Ayurvedic Store,<br />
              Ahmedabad, Gujarat, India
            </p>
          </div>

          {/* Email */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-3">
            <FaEnvelope className="text-green-600 text-2xl" />
            <h3 className="font-semibold text-lg">Email</h3>
            <p className="text-sm text-gray-600">
              info@kanhiyaayurveda.com<br />
              support@kanhiyaayurveda.com
            </p>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-3">
            <FaPhoneAlt className="text-green-600 text-2xl" />
            <h3 className="font-semibold text-lg">Phone</h3>
            <p className="text-sm text-gray-600">
              +91 98765 43210<br />
              +91 91234 56789
            </p>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-3">
            <h3 className="font-semibold text-lg">Follow Us</h3>
            <div className="flex gap-4 mt-2">
              <a href="#" className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition">
                <FaInstagram />
              </a>
              <a href="#" className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition">
                <FaWhatsapp />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
