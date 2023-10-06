import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  products: [
    {
      _id: String,
      name: String,
      description: String,
      price: Number,
      imageURL: String,
      category: String,
      checked: Boolean,
      quantity: Number,
    },
  ],
  completed: Boolean,
},{timestamps:true});

const ProductsList =
  mongoose.models.productlist || mongoose.model("productlist", productSchema);

export default ProductsList;
