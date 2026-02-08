import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    // Single Image (Cloudinary)
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },

    // Personal Information
    personalInfo: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
      },
      phone: {
        type: String,
        required: true,
      },
      bio: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
    },

    // Social Links
    socialLinks: {
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
      telegram: {
        type: String,
      },
      twitter: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Profile ||
  mongoose.model("Profile", ProfileSchema);
