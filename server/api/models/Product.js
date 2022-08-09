import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      default: 1
    },
    rating: {
      rate: Number, 
      count: Number
    }
  },
  { timestamps: true }
);

const Product = mongoose.model('product', ProductSchema);
export default Product;
