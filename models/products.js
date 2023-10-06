import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
      },
      description: String,
      
      price: {
        type: Number,
        required: true,
      },
      imageURL:{
        type: String,
      },
      category:String,
      checked:Boolean,
  },
  { timestamps: true }
);

const Products = mongoose.models.product || mongoose.model("product", productSchema);

export default Products;