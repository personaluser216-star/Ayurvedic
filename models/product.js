import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },

    images: {
      type: [String],
      required: true,
    },

    variants: [
      {
        weight: { type: Number, required: true },
        unit:{type:String,required:true},
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
