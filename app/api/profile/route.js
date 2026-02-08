import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Profile from "@/models/profile";
import profile from "@/models/profile";



export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get("image");
    if (!file) {
      return NextResponse.json(
        { success: false, message: "Profile image is required" },
        { status: 400 }
      );
    }


    const buffer = Buffer.from(await file.arrayBuffer());

  
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "profiles",
          },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

  
   const Newprofile = await Profile.create({
  image: {
    public_id: uploadResult.public_id,
    url: uploadResult.secure_url,
  },

  personalInfo: {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    bio: formData.get("bio"),
    city: formData.get("city"),
    country: formData.get("country"),
  },

  socialLinks: {
    facebook: formData.get("facebook"),
    instagram: formData.get("instagram"),
    telegram: formData.get("telegram"),
    twitter: formData.get("twitter"),
  },
});

return NextResponse.json(
  {
    success: true,
    message: "Profile created successfully",
    data: Newprofile,
  },
  { status: 201 }
);


  
  } catch (error) {
    console.error("PROFILE CREATE ERROR:", error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const profileData = await Profile.findOne(); 

    if (!profileData) {
      return NextResponse.json(
        { success: false, message: "Profile data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: profileData },
      { status: 200 }
    );
    } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}